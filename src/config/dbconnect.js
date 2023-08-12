import mongoose from "mongoose";

mongoose.connect("mongodb+srv://eduardasouza111213:123@cluster0.bqqihbp.mongodb.net/database-alura");

let db = mongoose.connection;

export default db;