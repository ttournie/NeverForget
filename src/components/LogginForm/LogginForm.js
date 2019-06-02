import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { login } from '../../store/actions/user';

const LogginForm = ({
    fetchinError,
    fetching,
    login,
    isAuthenticated
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (fetchinError) {
            setError('Wrong username or password');
        }
    }, [fetchinError])

    const formValidation = () => {
        if (username === '' ) {
            setError('username are required');
            return false;
        }
        if (password === '') {
            setError('password are required');
            return false;
        }
        return true;
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        setError(null);
        if (formValidation()) {
            login({username, password});
        };
    }

    return (
        <>
            {isAuthenticated && <Redirect to="/"/>}
            <form
                onSubmit={handelSubmit}
                noValidate
            >
                <label htmlFor="username" >Username</label>
                <input type="text" name="username" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Submit" disabled={fetching}/>
                {error && <div>{error}</div>}
            </form>
        </>
    )
}

LogginForm.propTypes = {
    fetchinError: PropTypes.bool,
    fetching: PropTypes.bool,
    userInfo: PropTypes.object,
    login: PropTypes.func,
};

const mapStateToProps = ({user}) => ({
    fetchinError: user.error,
    fetching: user.fetching,
    isAuthenticated: user.isAuthenticated,
})

export default connect(mapStateToProps,
    {login}
    )(LogginForm);