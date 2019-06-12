import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NoteForm from './components/NoteForm/NoteForm';
import LogginForm from './components/LogginForm/LogginForm';
import SubscribeForm from './components/SubscribeForm/SubscribeForm';
import NoteList from './components/NoteList/NoteList';
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
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/login' component={LogginForm}/>
            <Route exact path='/subscribe' component={SubscribeForm}/>
            <ProtectedRoute isAllowed={isAllowed} exact path='/my-page' component={NoteList}/>
            <ProtectedRoute isAllowed={isAllowed} exact path='/createNote' component={NoteForm}/>
          </Switch>
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
