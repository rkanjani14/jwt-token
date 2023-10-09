import mongoose from "mongoose";


const connectDb = async (DATABASE_URL)=>{
    const options = {
        dbName:"logindb"
    }
    await mongoose.connect(DATABASE_URL,options)
    console.log("Connected db")
}
export default connectDb