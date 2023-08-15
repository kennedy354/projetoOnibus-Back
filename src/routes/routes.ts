import express, {Express, Request, Response} from 'express'
import { atualizarPonto, criarPonto, deletarPonto, mostrarPontos } from '../service/pontoService'
import { atualizarOnibus, criarOnibus, deletarOnibus, mostrarOnibus } from '../service/onibusService'
import { atualizarAluno, checkIN, criarAluno, deletarAluno, listarVaiHoje, mostrarAlunos } from '../service/alunoService'
import { login } from '../service/login'
import autenticar from '../middleware/auth'

const router = express.Router()
router.use(express.json())

//Rotas Pontos
router.route('/ponto').post(criarPonto)

router.route('/ponto').get(mostrarPontos)

router.route('/ponto/:id').put(autenticar, atualizarPonto)

router.route('/ponto/:id').delete(autenticar, deletarPonto)

//Rotas Onibus
router.route('/onibus').post(criarOnibus)

router.route('/onibus').get(mostrarOnibus)

router.route('/onibus/:id').put(autenticar, atualizarOnibus)

router.route('/onibus/:id').delete(autenticar, deletarOnibus)

//Rotas Alunos
router.route('/aluno').post(criarAluno)

router.route('/aluno').get(mostrarAlunos)

router.route('/aluno/:id').put(atualizarAluno)

router.route('/aluno/:id').delete(deletarAluno)

router.route('/aluno/:id/checkIn').put(autenticar, checkIN)

//Outras rotas
router.route('/vaiHoje').get(listarVaiHoje)

router.post('/auth', login, (req:Request , res:Response) => {})

export default router