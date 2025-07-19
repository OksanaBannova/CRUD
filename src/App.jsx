import { useState, useEffect } from 'react';
import Note from './components/Note/Note';
import AddNote from './components/AddNote/AddNote';
import './App.css'


export default function App() {

  const [notes, setNotes] = useState([]);
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);

  const fetchNotes = async () => {
    if (isBtnAnimated) return;
    setIsBtnAnimated(true);
    setTimeout(() => setIsBtnAnimated(false), 500);

    try {
      "const response = await fetch('http://localhost:7070/notes');"
      const response = await fetch('https://ra-lifecycle-http-crud-frontend.onrender.com/notes');
      const data = await response.json();
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (content) => {
    try {
      await fetch('https://ra-lifecycle-http-crud-frontend.onrender.com/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`https://ra-lifecycle-http-crud-frontend.onrender.com/notes/${id}`, {
        method: 'DELETE'
      });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <>
      <h1>6. Домашнее задание к занятию «Жизненный цикл и работа с HTTP»</h1>
      <h2>6.2 CRUD</h2>
      <div className="container">
        <header className={'crud__header'}>
          <div className={'crud__title'}>Notes</div>
          <button className={`crud__btn-udate${isBtnAnimated ? ' crud__btn-udate_animated' : ''}`} onClick={fetchNotes}>
            <span className={'material-icons'}>autorenew</span>
          </button>
        </header>
        <div className={'crud__notes'}>
          {notes.map((note) =>
            <div className={'crud__note'} key={note.id}>
              <Note key={note.id} note={note} onDelete={deleteNote} />
            </div>
          )}
        </div>
        <AddNote onAdd={addNote} />
      </div>
    </>
  );
};


