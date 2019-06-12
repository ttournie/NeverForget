import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

const HomePage = ({ user }) => {
    return (
        <>
            Welcom {user && user.username}
        </>
    )
};

HomePage.propType = {
    userInfo: PropType.object,
}

const MapStateToProps = ({ user }) => ({
    user: user.userInfo, 
})

export default connect(MapStateToProps)(HomePage);