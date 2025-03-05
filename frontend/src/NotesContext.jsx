import { useState, createContext, useContext } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const {user, isSignedIn} = useUser();
    const { getToken } = useAuth();
    
    const addNote = async (noteTitle) => {
        try {
            const noteObject = { title: noteTitle, id: Date.now(), todos: [] };
            console.log(noteObject);
            const token = await getToken()
            if (isSignedIn) {
                const response = await fetch(`${BASE_URL}/notes`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(noteObject)
                });
                if (!response.ok) throw new Error("Failed to add note");
            }    
            setNotes(prevNotes => [...prevNotes, noteObject]);
        } catch (error) {
            console.error(error.message);
        }
    };

    const updateNoteTodos = async (id, newTodos) => {
        try {
            const token = await getToken()
            if (isSignedIn) {
                const response = await fetch(`${BASE_URL}/notes/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ todos: newTodos })
                });
                if (!response.ok) throw new Error("Failed to update note todos");
            }
            setNotes(prevNotes =>
                prevNotes.map(note => (note.id === id ? { ...note, todos: newTodos } : note))
            );
        } catch (error) {
            console.error(error.message);
        }
    };
    
    const updateNoteTitle = async (id, newTitle) => {
        try {
            const token = await getToken()
            if (isSignedIn) {
                const response = await fetch(`${BASE_URL}/notes/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ title: newTitle })
                });
                if (!response.ok) throw new Error("Failed to update note title");
            }
            setNotes(prevNotes =>
                prevNotes.map(note => (note.id === id ? { ...note, title: newTitle } : note))
            );
        } catch (error) {
            console.error(error.message);
        }
    };

    const removeNote = async (id) => {
        try {
            const token = await getToken()
            if (isSignedIn) {
                const response = await fetch(`${BASE_URL}/notes/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error("Failed to delete note");
            }
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, addNote, updateNoteTodos, updateNoteTitle, removeNote }}>
            {children}
        </NotesContext.Provider>
    );
};

const useNotes = () => {
    return useContext(NotesContext);
};

export { NotesProvider, useNotes };
