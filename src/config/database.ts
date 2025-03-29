import { connect } from 'mongoose'

const connectDB = async (mongoURI: string) => {
  try {
    await connect(mongoURI)
    console.log('MongoDB Connected...')
    return true
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('An unknown error occurred')
    }
    return false
  }
}

export default connectDB
