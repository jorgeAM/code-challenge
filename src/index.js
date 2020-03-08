import mongoose from 'mongoose'
import app from './app'

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const PORT = process.env.PORT || 3000

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error 💥'))

db.once('open', function() {
  console.log(`successful connection to mongo 🚀`)

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} 🚀`)
  })
})
