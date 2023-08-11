import mongoose,{Schema, Document} from 'mongoose'
import sOnibus from './onibusModel'
import sParada from './pontoModel'

interface sAluno extends Document{
    nome: string
    senha: string
    email: string
    cpf: string
    dataNascimento: Date
    telefone: string
    adm: boolean
    ponto: mongoose.Types.ObjectId | typeof sParada
    onibus: mongoose.Types.ObjectId | typeof sOnibus
    vaiHoje: boolean
}

const alunoSchema = new Schema<sAluno>({
    nome: { type: String, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    telefone: { type: String, required: true },
    adm: { type: Boolean, required: true },
    ponto: { type: mongoose.Types.ObjectId, ref: 'Ponto', required: true },
    onibus: { type: mongoose.Types.ObjectId, ref: 'Onibu', required: true },
    vaiHoje: { type: Boolean, required: true }
})

const Aluno = mongoose.model<sAluno>('Aluno', alunoSchema);

export default Aluno