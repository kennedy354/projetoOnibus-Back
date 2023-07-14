import express, {Express, Request, Response} from 'express'
import Onibus from '../model/onibusModel'

export async function criarOnibus (req:Request, res:Response){
    const {motorista, placa, ano} = req.body

    const onibus = {
        motorista,
        placa,
        ano
    }

    if(!motorista || !placa || !ano){
        res.status(400).json({error: 'Campos obrigatórios faltando'})
        return
    }

    try {
        await Onibus.create(onibus)
        res.status(201).json({message: 'Sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export async function mostrarOnibus (req:Request, res:Response){
    try {
        const onibus = await Onibus.find()
        res.status(200).json(onibus)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export async function atualizarOnibus (req:Request, res:Response){
    const id = req.params.id

    const {motorista, placa, ano} = req.body

    const onibus = {
        motorista,
        placa,
        ano
    }

    try {
        const onibusTeste = await Onibus.findById(id)
        if(!onibusTeste){
            res.status(404).json({ message: 'Onibus não encontrado' })
            return
        }

        await Onibus.updateOne({_id: id}, onibus)
        res.status(200).json(onibus)
    } catch (error) {
        res.status(404).json({ message: 'Onibus não encontrado' })
        return
    }
}

export async function deletarOnibus (req:Request, res:Response){
    const id = req.params.id

    try {
        const onibusTeste = await Onibus.findById(id)
        if(!onibusTeste){
            res.status(404).json({ message: 'Onibus não encontrado' })
            return
        }

        await Onibus.deleteOne({ _id: id })
        res.status(204).json({ message: 'Onibus deletado' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar onibus' })
    }
}