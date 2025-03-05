import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNotes } from '../NotesContext';
const NoteAdder = () => {
  const [input, setInput] = useState("");
  const { addNote } = useNotes();
  
  const handleSubmit = () => {
    if (input.trim() === "") return;
    addNote(input);
    setInput("");
  };

  return (
    <div className="flex items-center justify-between bg-slate-300 w-auto h-20 mx-5 px-4 rounded-2xl">
      <input className="flex-1 px-3 py-2 text-lg rounded-lg outline-none bg-transparent placeholder-gray-600" placeholder="Enter list title..." onChange={(e)=>{setInput(e.target.value)}} value={input} />
      <AddCircleIcon className="text-neutral-900 hover:text-gray-600 cursor-pointer transition-all ease-in active:scale-90 " sx={{ fontSize: 60 }} onClick={handleSubmit} />
    </div>
  );
};
export default NoteAdder;