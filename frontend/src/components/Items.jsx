import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from "@mui/icons-material/Save";


const Items = ({id, text, status, remove, updateText, check}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateText(id, newText);
        setIsEditing(false);
    }

    return (
        <div className="flex justify-between px-2 mx-3 h-auto rounded-lg">
            <FormControlLabel
                control={
                    <Checkbox 
                        checked={status}
                        onChange={() => check(id)}
                        sx={{status}? { color: "gray", '& .MuiSvgIcon-root': { fontSize: 40 }, '&.Mui-checked': { color: "gray" } } : { color: "white", '& .MuiSvgIcon-root': { fontSize: 40 }, '&.Mui-checked': { color: "white" } }}
                    />
                }
                label={isEditing ? ( <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="bg-transparent border-b-2 border-gray-500 text-white text-xl outline-none"
                        />
                        ) : (<span
                            className={`text-xl ${
                                status ? "line-through text-slate-400" : "text-white"
                            }`}
                        >{text}</span>) }
                // sx={'&.MuiFormControlLabel-label': { fontSize: 40 }}
                // className={(props.status) ? " line-through text-slate-400" : "text-white text-5xl"}
            />
            <div>
                {isEditing ? <SaveIcon className="mr-2 relative top-[18px] text-neutral-600 cursor-pointer hover:text-green-400" onClick={handleSave} sx={{fontSize:25}} />
                    : <EditIcon className="mr-2 relative top-[18px] text-neutral-600 cursor-pointer hover:text-gray-400" onClick={handleEdit} sx={{fontSize:25}} />}
                <DeleteIcon className="relative top-[18px] text-neutral-600 cursor-pointer hover:text-red-400" onClick={() => {return remove(id)}} sx={{fontSize:25}}/>
            </div>
        </div>
    );
};


export default Items;
