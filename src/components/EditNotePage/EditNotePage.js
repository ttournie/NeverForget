import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { getNote } from '../../store/actions/note';
import NoteForm from '../NoteForm/NoteForm';

const EditNotePage = ({ match, note, getNote: getNoteAction }) => {
  useEffect(() => {
    getNoteAction(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!R.isEmpty(note) && <NoteForm note={note} />}
    </div>
  );
};

EditNotePage.propTypes = {
  note: PropTypes.object,
  match: PropTypes.object,
  getNote: PropTypes.func,
};

const MapStateToProps = ({ note }) => ({
  note: note.notes.length > 0 ? note.notes[0] : {},
});
export default connect(MapStateToProps, { getNote })(EditNotePage);
