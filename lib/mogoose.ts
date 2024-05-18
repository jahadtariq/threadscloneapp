import mongoose from "mongoose";

let isConnected = false; // check if database is connected

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL)
        return console.log("MONGODB_URL not found");

    if(isConnected)
        return console.log("Database is already connected.")

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log("Database connected successfully.");
    } catch (error) {
        console.log("Database not connected: ", error);
    }
}