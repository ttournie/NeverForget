import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import { login, resetError } from '../../store/actions/user';

const LogginForm = ({
  fetchinError,
  fetching,
  login: loginAction,
  resetError: resetErrorAction,
  isAuthenticated,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => () => {
    resetErrorAction();
  }, []);

  useEffect(() => {
    if (fetchinError) {
      setError('Wrong username or password');
    }
  }, [fetchinError]);

  const formValidation = () => {
    if (username === '') {
      setError('username are required');
      return false;
    }
    if (password === '') {
      setError('password are required');
      return false;
    }
    return true;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (formValidation()) {
      loginAction({ username, password });
    }
  };

  return (
    <>
      {isAuthenticated && <Redirect to="/" />}
      <form
        onSubmit={handelSubmit}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField type="text" variant="outlined" fullWidth id="username" label="Username" name="username" placeholder="username" required value={username} onChange={e => setUsername(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" variant="outlined" fullWidth id="password" label="Password" name="password" placeholder="" required value={password} onChange={e => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="secondary" type="submit" value="Submit" disabled={fetching}>Submit</Button>
          </Grid>
          {error && <Typography variant="body2" color="textSecondary" align="center">{error}</Typography>}
        </Grid>
      </form>
    </>
  );
};

LogginForm.propTypes = {
  fetchinError: PropTypes.bool,
  fetching: PropTypes.bool,
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  resetError: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  fetchinError: user.error,
  fetching: user.fetching,
  isAuthenticated: user.isAuthenticated,
});

export default connect(mapStateToProps,
  { login, resetError })(LogginForm);
