import React,{ useEffect } from "react";
import { useNotes } from "../NotesContext";
import { useUser, useAuth } from "@clerk/clerk-react";

const DataLoader = React.memo(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { setNotes } = useNotes();
    const { isSignedIn } = useUser();
    const { getToken } = useAuth()
    useEffect(() => {
        const fetchNotes = async () => {
            const token = await getToken()
            const response = await fetch(`${BASE_URL}/notes`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            const notes = data.map((note) => {
                return {
                id: note.id,
                title: note.title,
                todos: note.todos
                };
            });
            setNotes(notes);
        };
        if (isSignedIn) {
            fetchNotes();
        }
    }, [isSignedIn]);

    return null; // No UI, just runs the effect
});

export default DataLoader;
