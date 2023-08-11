import express, { Express, Request, Response } from "express";
import Parada from "../model/pontoModel";
import Aluno from "../model/alunoModel";

export async function criarPonto(req: Request, res: Response) {
  const { rua, bairro, pontoReferencia } = req.body;

  const parada = {
    rua,
    bairro,
    pontoReferencia,
  };

  if (!rua || !bairro || !pontoReferencia) {
    res.status(400).json({ message: "Campos obrigatórios faltando" });
    return;
  }

  try {
    await Parada.create(parada);

    res.status(201).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).json({ message: "não prestou" });
  }
}

export async function mostrarPontos(req: Request, res: Response) {
  try {
    const paradas = await Parada.find();
    res.status(200).json(paradas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function atualizarPonto(req: Request, res: Response) {
  const id = req.params.id;

  const { rua, bairro, pontoReferencia } = req.body;

  const parada = {
    rua,
    bairro,
    pontoReferencia,
  };

  if (!rua || !bairro || !pontoReferencia) {
    res.status(400).json({ message: "Campos obrigatórios faltando" });
    return;
  }

  try {
    const paradaTeste = await Parada.findById(id);
    if (!paradaTeste) {
      res.status(404).json({ message: "Ponto não encontrado" });
      return;
    }

    await Parada.updateOne({ _id: id }, parada);
    res.status(200).json(parada);
  } catch (error) {
    res.status(404).json({ message: "Ponto não encontrado" });
    return;
  }
}

export async function deletarPonto(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const parada = await Parada.findById(id);
    if (!parada) {
      res.status(404).json({ message: "Ponto não encontrado" });
      return;
    }

    const alunoComPonto = await Aluno.findOne({ ponto: id });
    if (alunoComPonto) {
      res.status(400).json({
        message: "O ponto está associado a um aluno e não pode ser deletado",
      });
      return;
    }

    await Parada.deleteOne({ _id: id });
    res.status(204).json({ message: "Ponto deletado" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar ponto" });
  }
}
