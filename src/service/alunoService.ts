import express, { Express, Request, Response } from "express";
import Aluno from "../model/alunoModel";
import Parada from "../model/pontoModel";
import Onibus from "../model/onibusModel";

export async function criarAluno(req: Request, res: Response) {
  const {
    nome,
    senha,
    email,
    cpf,
    dataNascimento,
    telefone,
    adm,
    ponto,
    onibus,
  } = req.body;

  const vaiHoje = false;

  const aluno = {
    nome,
    senha,
    email,
    cpf,
    dataNascimento,
    telefone,
    adm,
    ponto,
    onibus,
    vaiHoje,
  };

  if (
    !nome ||
    !senha ||
    !email ||
    !cpf ||
    !dataNascimento ||
    !telefone ||
    !ponto ||
    !onibus
  ) {
    res.status(400).json({ message: "Campos obrigatórios faltando" });
    return;
  }

  try {
    const checarOnibus = await Onibus.findById(onibus);
    if (!checarOnibus) {
      res.status(400).json({ message: "ID do onibus inválido" });
      return;
    }

    const checarParada = await Parada.findById(ponto);
    if (!checarParada) {
      res.status(400).json({ message: "ID do ponto inválido" });
      return;
    }

    await Aluno.create(aluno);
    res.status(201).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).json({ message: "não prestou" });
  }
}

export async function mostrarAlunos(req: Request, res: Response) {
  try {
    const alunos = await Aluno.find();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function atualizarAluno(req: Request, res: Response) {
  const id = req.params.id;

  const {
    nome,
    senha,
    email,
    cpf,
    dataNascimento,
    telefone,
    adm,
    ponto,
    onibus,
  } = req.body;

  const aluno = {
    nome,
    senha,
    email,
    cpf,
    dataNascimento,
    telefone,
    adm,
    ponto,
    onibus,
  };

  try {
    const checarAluno = await Aluno.findById(id);
    if (!checarAluno) {
      res.status(404).json({ message: "Aluno não encontrado" });
      return;
    }

    if (onibus) {
      const checarOnibus = await Onibus.findById(onibus);
      if (!checarOnibus) {
        res.status(400).json({ message: "ID do onibus inválido" });
        return;
      }
    }

    if (ponto) {
      const checarParada = await Parada.findById(ponto);
      if (!checarParada) {
        res.status(400).json({ message: "ID do ponto inválido" });
        return;
      }
    }

    await Aluno.updateOne({ _id: id }, aluno);
    res.status(200).json(aluno);
  } catch (error) {
    res.status(404).json({ message: "Aluno não encontrado" });
    return;
  }
}

export async function deletarAluno(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const checarAluno = await Aluno.findById(id);
    if (!checarAluno) {
      res.status(404).json({ message: "Aluno não encontrado" });
      return;
    }

    await Aluno.deleteOne({ _id: id });
    res.status(204).json({ message: "Aluno deletado" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar aluno" });
  }
}

export async function checkIN(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const aluno = await Aluno.findById(id);
    if (!aluno) {
      res.status(404).json({ message: "Aluno não encontrado" });
      return;
    }

    aluno.vaiHoje = true;
    await aluno.save();

    res.status(200).json({ message: "Sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro" });
  }
}

export async function listarVaiHoje(req: Request, res: Response) {
  try {
    const alunoVaiHoje = await Aluno.find({ vaiHoje: true });

    const pontosVaiHojeIds = [
      ...new Set(alunoVaiHoje.map((aluno) => aluno.ponto)),
    ];

    const pontosVaiHoje = await Parada.find({ _id: { $in: pontosVaiHojeIds } });

    res.status(200).json({ pontosVaiHoje });
  } catch (error) {
    res.status(500).json({ message: "Erro" });
  }
}
