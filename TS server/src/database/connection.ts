import mongoose from "mongoose";
import dotenv from 'dotenv';

export async function connectDB(){
    dotenv.config();
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log('Database Connected');
    } catch (error) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        console.log('Database Connectivity Error', error);
    }
}