import Note from './Note';
import { useNotes } from '../NotesContext';
const NoteGrid = () => {
    const { notes } = useNotes();
    return(
        <div className="grid auto-rows-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 place-items-center p-4">
            {notes.map((note) => {
                return <Note key={note.id} id={note.id} title={note.title} todoList={note.todos} />
            })}
        </div>  
    )
}

export default NoteGrid;