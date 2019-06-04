import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import NoteForm from './components/NoteForm/NoteForm';
import LogginForm from './components/LogginForm/LogginForm';
import SubscribeForm from './components/SubscribeForm/SubscribeForm';
import MyPage from './components/MyPage/MyPage';
import NavBar from './components/NavBar/NavBar';
import { getUserFromSession } from './store/actions/user';
import styles from './App.less';

const ProtectedRoute = ({ isAllowed, ...props }) => 
     isAllowed 
     ? <Route {...props}/> 
     : <Redirect to="/login"/>;

const App = ({isAuthenticated, getUserFromSession}) => {

  useEffect(() => {
    if (isAuthenticated) {
      getUserFromSession();
    }
  }, [isAuthenticated, getUserFromSession])

  return (
    <div className={styles.App}>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={NoteForm}/>
          <Route exact path='/login' component={LogginForm}/>
          <Route exact path='/subscribe' component={SubscribeForm}/>
          <ProtectedRoute isAllowed={isAuthenticated} exact path='/my-page' component={MyPage}/>
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

export default connect(mapStateToProps, {getUserFromSession})(App);
