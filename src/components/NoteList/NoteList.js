import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserNotes, deleteNote, resetError } from '../../store/actions/note';

const NoteList = ({
  fetching,
  error,
  notes,
  getUserNotes: getUserNotesAction,
  deleteNote: deleteNoteAction,
  resetError: resetErrorAction,
}) => {
  useEffect(() => {
    getUserNotesAction();
    return () => {
      resetErrorAction();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    deleteNoteAction(id);
  };

  return (
    <>
      {fetching && <div> fetching notes </div>}
      {error && <div> error fetching notes </div>}
      {!error && !fetching
                && (
                <ul>
                  {notes.map((note) => {
                    const { _id: id } = note;
                    return (
                      <li key={id}>
                        <Link to={`/note/${id}`}>{note.title}</Link>
                        {' '}
                          -
                        {note.text}
                        <button type="button" onClick={() => handleDelete(id)}>delete</button>
                      </li>
                    );
                  })}
                </ul>
                )
            }
    </>
  );
};

NoteList.propTypes = {
  fetching: PropTypes.bool,
  error: PropTypes.bool,
  notes: PropTypes.arrayOf(PropTypes.object),
  getUserNotes: PropTypes.func,
  deleteNote: PropTypes.func,
  resetError: PropTypes.func,
};

const MapStateToProps = ({ note }) => ({
  fetching: note.fetching,
  error: note.error,
  notes: note.notes,
});

export default connect(MapStateToProps, { getUserNotes, deleteNote, resetError })(NoteList);
