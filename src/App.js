import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AddNotePage from './components/AddNodePage/AddNotePage';
import LogginForm from './components/LogginForm/LogginForm';
import SubscribeForm from './components/SubscribeForm/SubscribeForm';
import NoteList from './components/NoteList/NoteList';
import NavBar from './components/NavBar/NavBar';
import NotePage from './components/NotePage/NotePage';
import EditNotePage from './components/EditNotePage/EditNotePage';
import { getUserFromSession } from './store/actions/user';
import styles from './App.less';


const ProtectedRoute = ({ isAllowed, ...props }) => {
  if (isAllowed === true) return <Route {...props} />;
  if (isAllowed === false) return <Redirect to="/login" />;
  return null;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
};

const App = ({ isAuthenticated, getUserFromSession: getUserFromSessionAction, location }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      getUserFromSessionAction();
    }
  }, [location, getUserFromSessionAction, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.App}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LogginForm} />
        <Route exact path="/subscribe" component={SubscribeForm} />
        <ProtectedRoute isAllowed={isAllowed} exact path="/my-page" component={NoteList} />
        <ProtectedRoute isAllowed={isAllowed} exact path="/createNote" component={AddNotePage} />
        <ProtectedRoute isAllowed={isAllowed} exact path="/note/:id" component={NotePage} />
        <ProtectedRoute isAllowed={isAllowed} exact path="/note/edit/:id" component={EditNotePage} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  getUserFromSession: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = ({ user }) => ({
  isAuthenticated: user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, { getUserFromSession })(App));
