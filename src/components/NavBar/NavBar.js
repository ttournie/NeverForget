import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './NavBar.less';
import { logout } from '../../store/actions/user';

const NavBar = ({
    isAuthenticated,
    logout
}) => {

    const handelLogout = () => {
        logout();
    }

    return (
        <div className={styles.navBar}>
            <NavLink to='/' className={styles.link}>Home</NavLink>
            {!isAuthenticated &&
                <>
                    <NavLink to='/login' className={styles.link}>login</NavLink>
                    <NavLink to='/subscribe' className={styles.link}>subscribe</NavLink>
                </>
            }
            
            {isAuthenticated &&
                <>
                <NavLink to='/my-page' className={styles.link}>My Page</NavLink>
                <NavLink to='/createNote' className={styles.link}>Add a note</NavLink>
                <button onClick={handelLogout}>Logout</button>
                </>
            }
        </div>
    )
};

NavBar.propTypes = {
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
};

const mapStateToProps = ({user}) => ({
    isAuthenticated: user.isAuthenticated,
});

export default connect(mapStateToProps, {logout})(NavBar);