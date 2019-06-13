import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserNotes } from '../../store/actions/note';

const NoteList = ({
    fetching,
    error,
    notes,
    getUserNotes
}) => {
    useEffect(() => {
        getUserNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            {fetching && <div> fetching notes </div>}
            {error && <div> error fetching notes </div>}
            {!error && !fetching && 
                <ul>
                    {notes.map(note => (
                        <li key={note._id}>
                            <Link to={`/note/${note._id}`}>{note.title}</Link> - {note.text}
                        </li>
                    ))}
                </ul>
            }
        </>
    )
};

NoteList.propTypes = {
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    notes: PropTypes.arrayOf(PropTypes.object),
};

const MapStateToProps = ({ note }) => ({
    fetching: note.fetching,
    error: note.error,
    notes: note.notes,
})

export default connect(MapStateToProps, { getUserNotes })(NoteList);