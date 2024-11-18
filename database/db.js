import mongoose from "mongoose"
mongoose.set("strictQuery", false)
export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.log('MongoDB connected failed')
    }
}