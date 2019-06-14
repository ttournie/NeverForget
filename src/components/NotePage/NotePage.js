/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getNote, resetError } from '../../store/actions/note';

const NotePage = ({
  match,
  note,
  getNote: getNoteAction,
  resetError: resetErrorAction,
}) => {
  useEffect(() => {
    getNoteAction(match.params.id);
    return () => {
      resetErrorAction();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!R.isEmpty(note)
                && (
                <div>
                  <div>
                    {note.title}
                    <Link to={`/note/edit/${note._id}`}>Edit</Link>
                  </div>
                  <div>
                    {note.text}
                  </div>
                </div>
                )
            }
    </>
  );
};

NotePage.propTypes = {
  note: PropTypes.object,
  match: PropTypes.object,
  getNote: PropTypes.func,
  resetError: PropTypes.func,
};

const MapStateToProps = ({ note }) => ({
  note: note.notes.length > 0 ? note.notes[0] : {},
});

export default connect(MapStateToProps, { getNote, resetError })(NotePage);
