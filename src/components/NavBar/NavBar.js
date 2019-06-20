/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Link,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/user';

const useStyles = makeStyles(() => ({
  toolbar: {
    borderBottom: '1px solid #ababab',
    justifyContent: 'flex-end',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: '2px',
    flexShrink: 0,
  },
}));

const NavBar = ({
  isAuthenticated,
  logout: logoutAction,
}) => {
  const handelLogout = () => {
    logoutAction();
  };

  const classes = useStyles();

  return (
    <>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        <Link className={classes.toolbarLink} component={NavLink} color="secondary" to="/">Home</Link>
        {!isAuthenticated
                    && (
                    <>
                      <Link className={classes.toolbarLink} component={NavLink} color="secondary" to="/subscribe">Subscribe</Link>
                      <Link className={classes.toolbarLink} component={NavLink} color="secondary" to="/login">Login</Link>
                    </>
                    )
                }

        {isAuthenticated
                    && (
                    <>
                      <Link className={classes.toolbarLink} component={NavLink} color="secondary" to="/my-page">My Page</Link>
                      <Link className={classes.toolbarLink} component={NavLink} color="secondary" to="/createNote">Add a note</Link>
                      <Button variant="outlined" size="small" onClick={handelLogout}>Logout</Button>
                    </>
                    )
                }
      </Toolbar>
    </>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  isAuthenticated: user.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavBar);
