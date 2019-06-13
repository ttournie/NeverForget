import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { addNote, editNote } from '../../store/actions/note';
import styles from './NoteForm.less';

const NoteForm = ({ addNote, editNote ,note }) => {
    const [body, setBody] = useState(!R.isEmpty(note) ? note.text : '');
    const [title, setTitle] = useState(!R.isEmpty(note) ? note.title : '');
    const [error, setError] = useState(null);

    const formValidation = () => {
        if (title === '' ) {
            setError('title is required');
            return false;
        }
        if (body === '') {
            setError('body is required');
            return false;
        }
        return true;
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (formValidation()) {
            if (!R.isEmpty(note)) {
                const { _id } = note;
                editNote({id: _id, title, body})
            } else {
                addNote({title, body});
            }
        };
    }

    return (
        <form
            className={styles.body}
            onSubmit={handleOnSubmit}
        >
            <label className={styles.body} htmlFor="body">Enter the note title</label>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label htmlFor="body">Enter the note body</label>
            <input type="text" name="body" value={body} onChange={(e) => setBody(e.target.value)}/>
            <input type="submit" value="Submit" />
            {error && <div>{error}</div>}
        </form>
    );
};

NoteForm.defaultProps = {
    note: {},
  };

NoteForm.propTypes = {
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    addNote: PropTypes.func,
    note: PropTypes.object,
};

const mapStateToProps = ({ note }) => ({
    fetching: note.fetching,
    error: note.error,
});

export default connect(mapStateToProps, {addNote, editNote})(NoteForm);