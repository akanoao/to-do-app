import AddCircleIcon from '@mui/icons-material/AddCircle';
import Items from './Items';
import { useState } from 'react';
import {useNotes} from '../NotesContext';
const Modal = ({noteId,closeModal,list}) => {
    const [localList, setLocalList] = useState(list);
    const [taskInput, setTaskInput] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const { updateNoteTodos } = useNotes();

    const addItem = () => {
        if (taskInput.trim() === "") return;
        const newItem = {id:Date.now(), text:taskInput, completed:false};
        setTaskInput("");
        setLocalList([...localList, newItem]);
        setIsDirty(true);
    }

    const removeItem = (id) => {
        const newList = localList.filter((item) => item.id !== id);
        setLocalList(newList);
        setIsDirty(true);
    }

    const updateStatusItem = (id) => {
        const newList = localList.map((item) => {
            return (item.id === id) ? {...item, completed: !item.completed} : item;
        });
        setLocalList(newList);
        setIsDirty(true);
    }

    const updateTextItem = (id,newText) => {
        const newList = localList.map((item) => {
            return (item.id === id) ? {...item, text: newText} : item;
        });
        setLocalList(newList);
        setIsDirty(true);
    }
    
    const handleClose = async () => {
        if (isDirty) await updateNoteTodos(noteId, localList);
        closeModal();
    }
    
    return(
        <div onClick={handleClose} className="fixed inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm z-10">
            <div role="dialog" tabIndex="0" onClick={(e) => {e.stopPropagation()}} onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();}} className="custom-scrollbar bg-neutral-900 text-white p-6 rounded-xl shadow-lg lg:w-4xl md:w-3xl sm:w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between bg-transparent border-slate-200 border-2 w-auto h-15 mx-5 mb-6 mt-2 px-4 rounded-2xl">
                    <input className="flex-1 px-3 py-2 text-lg rounded-lg outline-none bg-transparent placeholder-gray-500" placeholder="Add Task" onChange={(e) => {setTaskInput(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter") {addItem()}}} value={taskInput} />
                    <AddCircleIcon className="text-slate-200 hover:text-gray-600 cursor-pointer active:scale-95" sx={{ fontSize: 40 }} onClick={addItem} />
                </div>
                {localList.map((item) => {
                    return(<Items key={item.id} id={item.id} remove={removeItem} text={item.text} status={item.completed} updateText={updateTextItem} check={updateStatusItem} />)
                })}
            </div>
        </div>
    )
}

export default Modal;