import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/user';

const SubscribeForm = ({
  fetchinError,
  fetching,
  isAuthenticated,
  createUser: creatUserAction,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

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
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="username" required value={username} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="" required value={password} onChange={e => setPassword(e.target.value)} />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <input type="password" name="passwordConfirm" placeholder="" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
        <input type="submit" value="Submit" disabled={fetching} />
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

SubscribeForm.propTypes = {
  fetchinError: PropTypes.bool,
  fetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  createUser: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  fetchinError: user.error,
  fetching: user.fetching,
  isAuthenticated: user.isAuthenticated,
});

export default connect(mapStateToProps, { createUser })(SubscribeForm);
