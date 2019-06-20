import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HomePage = ({ user }) => (
  <>
            Welcome
    {' '}
    {user && user.username}
  </>
);

HomePage.propTypes = {
  user: PropTypes.object,
};

const MapStateToProps = ({ user }) => ({
  user: user.userInfo,
});

export default connect(MapStateToProps)(HomePage);
