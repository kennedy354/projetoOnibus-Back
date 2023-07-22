import mongoose,{Schema, Document} from 'mongoose'

interface sParada extends Document{
  rua: string
  bairro: string
  pontoReferencia: string
}

const ParadaSchema = new Schema<sParada>({
  rua: { type: String, required: true },
  bairro: { type: String, required: true },
  pontoReferencia: { type: String, required: true }
})

const Parada = mongoose.model<sParada>('Ponto', ParadaSchema);

export default Parada