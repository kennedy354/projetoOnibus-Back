import express, {Express, Request, Response} from 'express'
import { atualizarPonto, criarPonto, deletarPonto, mostrarPontos } from '../service/pontoService'
import { atualizarOnibus, criarOnibus, deletarOnibus, mostrarOnibus } from '../service/onibusService'
import { atualizarAluno, criarAluno, deletarAluno, mostrarAlunos } from '../service/alunoService'

const router = express.Router()
router.use(express.json())

//Rotas Pontos
router.post('/ponto', criarPonto, (req: Request, res: Response) => {})

router.route('/ponto').get(mostrarPontos)

router.route('/ponto/:id').put(atualizarPonto)

router.route('/ponto/:id').delete(deletarPonto)

//Rotas Onibus
router.route('/onibus').post(criarOnibus)

router.route('/onibus').get(mostrarOnibus)

router.route('/onibus/:id').put(atualizarOnibus)

router.route('/onibus/:id').delete(deletarOnibus)

//Rotas Alunos
router.route('/aluno').post(criarAluno)

router.route('/aluno').get(mostrarAlunos)

router.route('/aluno/:id').put(atualizarAluno)

router.route('/aluno/:id').delete(deletarAluno)

export default router