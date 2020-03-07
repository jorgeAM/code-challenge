import mongoose from 'mongoose'

const Schema = mongoose.Schema

const addressSchema = new Schema({
  name: String,
  email: String,
  birthDate: Date,
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }
})

export default mongoose.model('Address', addressSchema)
