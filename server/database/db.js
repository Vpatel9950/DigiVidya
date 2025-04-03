import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("DB connection successful");
    } catch (error) {
        console.log("Issue in DB connection:", error);
      
    }
}

export default connectDB;

