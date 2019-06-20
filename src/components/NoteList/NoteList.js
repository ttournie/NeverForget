import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link as UiLink,
  List,
  ListItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { getUserNotes, deleteNote, resetError } from '../../store/actions/note';

const useStyles = makeStyles(() => ({
  item: {
    justifyContent: 'space-between',
  },
}));

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

  const classes = useStyles();

  return (
    <>
      {fetching && <div> fetching notes </div>}
      {error && <div> error fetching notes </div>}
      {!error && !fetching
                && (
                <List>
                  {notes.map((note) => {
                    const { _id: id } = note;
                    return (
                      <ListItem className={classes.item} key={id}>
                        <UiLink component={Link} to={`/note/${id}`}>{note.title}</UiLink>
                        <UiLink component="button" color="secondary" type="button" onClick={() => handleDelete(id)}>delete</UiLink>
                      </ListItem>
                    );
                  })}
                </List>
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
