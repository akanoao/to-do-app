import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    id: { type: Number, required: true }, 
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const noteSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    todos: [],
    userId: { type: String }
});

export default mongoose.model("Note", noteSchema);
