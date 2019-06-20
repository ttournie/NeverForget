import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './NavBar.less';
import { logout } from '../../store/actions/user';

const NavBar = ({
  isAuthenticated,
  logout: logoutAction,
}) => {
  const handelLogout = () => {
    logoutAction();
  };

  return (
    <div className={styles.navBar}>
      <NavLink to="/" className={styles.link}>Home</NavLink>
      {!isAuthenticated
                && (
                <>
                  <NavLink to="/login" className={styles.link}>Login</NavLink>
                  <NavLink to="/subscribe" className={styles.link}>Subscribe</NavLink>
                </>
                )
            }

      {isAuthenticated
                && (
                <>
                  <NavLink to="/my-page" className={styles.link}>My Page</NavLink>
                  <NavLink to="/createNote" className={styles.link}>Add a note</NavLink>
                  <Button type="button" onClick={handelLogout}>Logout</Button>
                </>
                )
            }
    </div>
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
