import mongoose from 'mongoose'

let isConnected = false
const mongodbUri = process.env.MONGODB_URI
if(!mongodbUri){
    throw new Error("missing MongoDB Uri")
}

export const connectToDB = async () =>{
    if(isConnected){
       console.log('MongoDB is already connect')
       return
    }

    try {
        
        await mongoose.connect(mongodbUri, {
            dbName: "share_prompt"
        })

        isConnected = true

    } catch (error) {
        console.log(error)
        throw error

    }
} 