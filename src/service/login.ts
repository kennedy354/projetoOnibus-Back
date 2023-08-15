import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Aluno from "../model/alunoModel";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ message: "Campos obrigatórios faltando" });
    return;
  }

  const alunoExistente = await Aluno.findOne({ email: email });
  if (!alunoExistente || alunoExistente.senha != senha) {
    res
      .status(400)
      .json({ message: "Usuário não cadastrado ou Senha incorreta" });
    return;
  }

  const id = alunoExistente._id;
  const token = jwt.sign({ id, email }, "jwtSecret", { expiresIn: "1d" }); //(1d) é a validade do token, nesse caso vai ser 1 dia

  res.status(200).json({ message: "logado", token });
}
