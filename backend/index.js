import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "./config/db.js";
import Note from "./models/note.js";
import { requireAuth } from '@clerk/express'
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(requireAuth());
app.get("/notes", async (req,res) => {
    try {
        const user = req.auth.userId;
        const notes = await Note.find({userId: user});
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post("/notes", async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { id, title, todos } = req.body;
        const newNote = new Note({ id, title, todos, userId });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.patch("/notes/:id", async (req, res) => {
    try {
        const user = req.auth.userId;
        const noteId = parseInt(req.params.id);
        const { title, todos } = req.body;
        if (title) {
            const updatedNote = await Note.updateOne({ id: noteId, userId: user }, { $set: { title:title }});
            if (!updatedNote) {
                res.status(404).json({ message: "Note not found" });
            }
            res.status(200).json(updatedNote);
        } else if (todos) {
            const updatedNote = await Note.updateOne({ id: noteId, userId: user }, { $set: { todos:todos }});
            if (!updatedNote) {
                res.status(404).json({ message: "Note not found" });
            }
            res.status(200).json(updatedNote);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete("/notes/:id", async (req, res) => {
    try{
        const user = req.auth.userId;
        const noteId = parseInt(req.params.id);
        const deletedNote = await Note.deleteOne({ id: noteId, userId: user });
        if (!deletedNote) {
            res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(deletedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})