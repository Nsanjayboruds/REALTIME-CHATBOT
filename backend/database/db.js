import mongoose from "mongoose";


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.Db_url,{
            dbName: "mern-chat",
        });

        console.log("MongoDB connected successfully");
        
    }catch(error){
        console.log(error);
        

    }
}

export default connectDB;
