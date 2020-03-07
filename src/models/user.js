import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  birthDate: Date,
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }
})

export default mongoose.model('User', userSchema)
