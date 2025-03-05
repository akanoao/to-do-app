import Navbar from "./components/Navbar";
import NoteGrid from "./components/NoteGrid";
import NoteAdder from "./components/NoteAdder";
import { NotesProvider } from "./NotesContext";
import DataLoader from "./components/DataLoader";

function App() {
  return (
    <NotesProvider>
      <div className='flex flex-col gap-4 bg-slate-200 w-full min-h-screen'>
        <DataLoader />
        <Navbar />
        <NoteAdder />
        <NoteGrid />
      </div>
    </NotesProvider>
  )
}

export default App
