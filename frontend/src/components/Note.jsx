import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from "@mui/icons-material/Save";
import { useState } from 'react';
import Modal from './Modal';
import { useNotes } from '../NotesContext';

const Note = ({id,title,todoList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { updateNoteTitle, removeNote } = useNotes();
    const handleDelete = () => {
        removeNote(id);
    }

    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateNoteTitle(id, newText);
        setIsEditing(false);
    }
    const progress = Math.trunc((todoList.filter((todo) => todo.completed===true).length) / todoList.length * 100);
    return(
        <>
        <div onClick={() => {setIsOpen(true)}} className="flex flex-col justify-between w-9/10 h-60 bg-slate-300 text-black rounded-xl hover:bg-neutral-900 hover:text-white transition-all ease-in-out">
            <div className='flex justify-between items-center' onClick={(e)=>{e.stopPropagation()}}>
                {isEditing ? ( <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className=" w-[75%] font-medium text-4xl ml-5 mt-5 leading-2 bg-transparent border-b-2 border-gray-500 text-white outline-none"/>
                        ): <h2 className="w-[75%] font-medium text-4xl self-start ml-5 mt-5 leading-12 overflow-hidden text-ellipsis whitespace-nowrap">{title}</h2>}
                {isEditing ? <SaveIcon className="mr-5 mt-5 cursor-pointer hover:text-green-400" color='inherit' onClick={handleSave} sx={{fontSize:25}} />
                    : <EditIcon className="mr-5 mt-5 cursor-pointer hover:text-gray-400" color='inherit' onClick={handleEdit} sx={{fontSize:25}} />}
            </div>
            <div className='mx-5 w-auto'>
                <h2 className="font-medium text-md w-fit mb-2">progress:</h2>
                <LinearProgress variant="determinate" color="inherit" value={progress} />
            </div>
            <div className='w-fit self-end mr-5 mb-5' onClick={(e)=>{e.stopPropagation()}}>
                <DeleteIcon className='cursor-pointer hover:text-red-400' color='inherit' onClick={handleDelete} />
            </div>
        </div>
        {isOpen && <Modal closeModal={() => {setIsOpen(false) }} list={todoList} noteId={id} />}
        </>

    )
}
export default Note;