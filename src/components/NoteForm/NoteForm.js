import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import {
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { addNote, editNote, resetError } from '../../store/actions/note';

const NoteForm = ({
  fetching,
  error: serverError,
  addNote: addNoteAction,
  editNote: editNoteAction,
  resetError: resetErrorAction,
  note,
}) => {
  const [body, setBody] = useState(!R.isEmpty(note) ? note.text : '');
  const [title, setTitle] = useState(!R.isEmpty(note) ? note.title : '');
  const [error, setError] = useState(null);

  useEffect(() => () => {
    resetErrorAction();
  }, []);

  useEffect(() => {
    if (serverError) {
      setError('Error while adding/Editing');
    } else {
      setError(null);
    }
  }, [serverError]);

  const formValidation = () => {
    if (title === '') {
      setError('title is required');
      return false;
    }
    if (body === '') {
      setError('body is required');
      return false;
    }
    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formValidation()) {
      if (!R.isEmpty(note)) {
        const { _id } = note;
        editNoteAction({ id: _id, title, body });
      } else {
        addNoteAction({ title, body });
      }
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      noValidate
    >
      <TextField type="text" variant="outlined" fullWidth id="title" label="Title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
      <TextField type="text" variant="outlined" fullWidth id="body" label="Write your note..." name="body" value={body} onChange={e => setBody(e.target.value)} />
      <Button type="submit" fullWidth variant="contained" color="secondary" value="Submit" disabled={fetching}>Submit</Button>
      {error && <Typography variant="body2" color="textSecondary" align="center">{error}</Typography>}
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
  editNote: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = ({ note }) => ({
  fetching: note.fetching,
  error: note.error,
});

export default connect(mapStateToProps, { addNote, editNote, resetError })(NoteForm);
