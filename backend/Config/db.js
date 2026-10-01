import mongoose from "mongoose";
export const connectDB = async () => {
    mongoose.connect("mongodb+srv://iamabhaychaurasiya_db_user:qAs85GqRR9uMfw0v@cluster0.20riktp.mongodb.net///Ai")
    .then(() => {
        console.log("MongoDB connected");
    });
}