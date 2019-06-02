import React from 'react';
import { connect } from 'react-redux';

const MyPage = ({
    userInfo
}) => {
    return (
        <div>
            My user page.
            {userInfo.username && userInfo.username}
        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    userInfo: user.userInfo,
});

export default connect(mapStateToProps)(MyPage);