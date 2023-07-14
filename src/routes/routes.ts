import express, {Express, Request, Response} from 'express'
import { atualizarPonto, criarPonto, deletarPonto, mostrarPontos } from '../service/pontoService'
import { atualizarOnibus, criarOnibus, deletarOnibus, mostrarOnibus } from '../service/onibusService'

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

export default router