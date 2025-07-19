import { useState } from 'react';
import './add-note.css';

export default function AddNote ({ onAdd }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content);
      setContent('');
    }
  };

  return (

    <form className="crud__form form-new-note" onSubmit={handleSubmit}>
      <header className={'form-new-note__header'}>
      </header>
      <div className={'form-new-note__title'}>New Note</div>
      <div className="textarea-wrapper">
        <textarea
          className="form-new-note__input"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
        ></textarea>
        <button className="form-new-note__btn-send"></button>
      </div>
    </form>

  );
};