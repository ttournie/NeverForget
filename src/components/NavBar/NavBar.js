import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <Link to='/' className={styles.link}>Home</Link>
            {!isAuthenticated &&
                <>
                    <Link to='/login' className={styles.link}>login</Link>
                    <Link to='/subscribe' className={styles.link}>subscribe</Link>
                </>
            }
            
            {isAuthenticated &&
                <>
                <Link to='/my-page' className={styles.link}>My Page</Link>
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