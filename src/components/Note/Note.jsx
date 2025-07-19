import './note.css';

export default function Note({ note, onDelete }) {

  return (
    <div className={'note'}>
      <div className={'note__body'}>
        <p className={'note__text'}>{note.content}</p>
        <button className={'note__btn-remove'} onClick={() => onDelete(note.id)}>
        </button>
      </div>
    </div>
  );
};
