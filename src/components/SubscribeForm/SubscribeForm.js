import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { createUser, resetError } from '../../store/actions/user';
import styles from './SubscribeForm.less';

const SubscribeForm = ({
  fetchinError,
  fetching,
  isAuthenticated,
  createUser: creatUserAction,
  resetError: resetErrorAction,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => () => {
    resetErrorAction();
  }, []);

  useEffect(() => {
    if (fetchinError) {
      setError('Could not create user');
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
    if (password !== passwordConfirm) {
      setError('Passwords does not match');
      return false;
    }
    return true;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (formValidation()) {
      creatUserAction({ username, password });
    }
  };

  return (
    <>
      {isAuthenticated && <Redirect to="/" />}
      <form
        onSubmit={handelSubmit}
        noValidate
      >
        <div className={styles.section}>
          <TextField autoFocus variant="outlined" fullWidth id="username" label="Username" type="text" name="username" required value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className={styles.section}>
          <TextField variant="outlined" fullWidth id="password" label="Password" type="password" name="password" placeholder="" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={styles.section}>
          <TextField variant="outlined" fullWidth id="passwordConfirm" label="Confirm password" type="password" name="passwordConfirm" placeholder="" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
        </div>
        <Button fullWidth variant="contained" color="secondary" type="submit" value="Submit" disabled={fetching}>Submit</Button>
        {error && <Typography variant="body2" color="textSecondary" align="center">{error}</Typography>}
      </form>
    </>
  );
};

SubscribeForm.propTypes = {
  fetchinError: PropTypes.bool,
  fetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  createUser: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  fetchinError: user.error,
  fetching: user.fetching,
  isAuthenticated: user.isAuthenticated,
});

export default connect(mapStateToProps, { createUser, resetError })(SubscribeForm);
