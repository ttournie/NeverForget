/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link as UiLink,
  Typography,
  Grid,
} from '@material-ui/core';
import { getNote, resetError } from '../../store/actions/note';

const useStyles = makeStyles(() => ({
  title: {
  },
  text: {
    whiteSpace: 'pre-line',
  },
  link: {
    fontSize: '25px',
  },
}));

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

  const classes = useStyles();

  return (
    <>
      {!R.isEmpty(note)
                && (
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography className={classes.title} variant="h6" align="center">{note.title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.text} variant="body1" align="left">{note.text}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <UiLink className={classes.link} component={Link} to={`/note/edit/${note._id}`}>Edit</UiLink>
                  </Grid>
                </Grid>
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
