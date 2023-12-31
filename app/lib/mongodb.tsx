import mongoose from "mongoose"

const connectDB = async () => {
  try {
    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string)
      console.log('DB connected.')
    }
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

export default connectDB