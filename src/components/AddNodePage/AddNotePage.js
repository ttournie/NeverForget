import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import NoteForm from '../NoteForm/NoteForm';

const AddNotePage = () => (
  <div>
    <Typography variant="body2" color="textSecondary" align="center">Add a new note</Typography>
    <NoteForm />
  </div>
);

export default AddNotePage;
