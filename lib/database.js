import { connect, connection } from 'mongoose'

const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI
} = process.env;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

export const connectToDatabase = async () => {
  if (!connection.readyState) {
    console.log('Connecting to ', MONGO_URI)
    connect(MONGO_URI, options)
  }
}