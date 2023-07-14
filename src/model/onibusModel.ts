import mongoose,{Schema, Document} from 'mongoose'

interface sOnibus extends Document{
  motorista: string
  placa: string
  ano: string
}

const OnibusSchema = new Schema<sOnibus>({
  motorista: { type: String, required: true },
  placa: { type: String, required: true },
  ano: { type: String, required: true }
})

const Onibus = mongoose.model<sOnibus>('Onibu', OnibusSchema);

export default Onibus