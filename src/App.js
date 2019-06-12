import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NoteForm from './components/NoteForm/NoteForm';
import LogginForm from './components/LogginForm/LogginForm';
import SubscribeForm from './components/SubscribeForm/SubscribeForm';
import MyPage from './components/MyPage/MyPage';
import NavBar from './components/NavBar/NavBar';
import { getUserFromSession } from './store/actions/user';
import styles from './App.less';

const ProtectedRoute = ({ isAllowed, ...props }) => {
  if (isAllowed === true ) return <Route {...props}/>
  if (isAllowed === false ) return <Redirect to="/login"/>
  else return null;
}

const App = ({isAuthenticated, getUserFromSession, location}) => {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      getUserFromSession();
    }
  }, [location, getUserFromSession, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
  }, [isAuthenticated])

  return (
    <div className={styles.App}>
        <NavBar/>
        <BrowserRouter>
          <Switch>
            {/* <Route exact path='/' component={NoteForm}/> */}
            <Route exact path='/login' component={LogginForm}/>
            <Route exact path='/subscribe' component={SubscribeForm}/>
            <ProtectedRoute isAllowed={isAllowed} exact path='/my-page' component={MyPage}/>
            <ProtectedRoute isAllowed={isAllowed} exact path='/createNote' component={NoteForm}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({user}) => ({
  isAuthenticated: user.isAuthenticated
})

export default withRouter(connect(mapStateToProps, {getUserFromSession})(App));
