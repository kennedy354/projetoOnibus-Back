import express, {Express, Request, Response} from 'express'
import Aluno from '../model/alunoModel'
import Parada from '../model/pontoModel'
import Onibus from '../model/onibusModel'

export async function criarAluno (req:Request, res:Response){
    const {nome, senha, email, cpf, dataNascimento, telefone, adm, ponto, onibus} = req.body

    const aluno = {
        nome,
        senha,
        email,
        cpf,
        dataNascimento,
        telefone,
        adm,
        ponto,
        onibus
    }

    if(!nome || !senha || !email || !cpf || !dataNascimento || !telefone || !adm || !ponto || !onibus){
        res.status(400).json({error: 'Campos obrigatórios faltando'})
        return
    }

    try {
        const checarOnibus = await Onibus.findById(onibus);
        if (!checarOnibus) {
            res.status(400).json({ error: 'ID do onibus inválido' });
            return;
        }

        const checarParada = await Parada.findById(ponto);
        if (!checarParada) {
            res.status(400).json({ error: 'ID do ponto inválido' });
            return;
        }

        await Aluno.create(aluno)
        res.status(201).json({message: 'Sucesso'})
    } catch (error) {
        res.status(500).json({message: 'não prestou'})
    }
}

export async function mostrarAlunos(req: Request, res: Response){
    try {
        const alunos = await Aluno.find()
        res.status(200).json(alunos)
    } catch (error) {
        res.status(500).json({error: error})  
    }
}

export async function atualizarAluno(req: Request, res: Response){
    const id = req.params.id

    const {nome, senha, email, cpf, dataNascimento, telefone, adm, ponto, onibus} = req.body

    const aluno = {
        nome,
        senha,
        email,
        cpf,
        dataNascimento,
        telefone,
        adm,
        ponto,
        onibus
    }

    try {
        const checarAluno = await Aluno.findById(id)
        if (!checarAluno) {
            res.status(404).json({ message: 'Aluno não encontrado' })
            return
        }

        if(onibus){
            const checarOnibus = await Onibus.findById(onibus);
            if (!checarOnibus) {
                res.status(400).json({ error: 'ID do onibus inválido' });
                return;
            }
        }
        
        if(ponto){
            const checarParada = await Parada.findById(ponto);
            if (!checarParada) {
                res.status(400).json({ error: 'ID do ponto inválido' });
                return;
            }
        }

        await Aluno.updateOne({_id: id}, aluno)
        res.status(200).json(aluno)
    } catch (error) {
        res.status(404).json({ message: 'Aluno não encontrado' })
        return
    }
}

export async function deletarAluno(req: Request, res: Response){
    const id = req.params.id
    try {
        const checarAluno = await Aluno.findById(id)
        if (!checarAluno) {
            res.status(404).json({ message: 'Aluno não encontrado' })
            return
        }

        await Aluno.deleteOne({ _id: id })
        res.status(204).json({ message: 'Aluno deletado' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar aluno' })
    }
}