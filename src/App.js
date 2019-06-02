import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoteForm from './components/NoteForm/NoteForm';
import LogginForm from './components/LogginForm/LogginForm';
import SubscribeForm from './components/SubscribeForm/SubscribeForm';
import MyPage from './components/MyPage/MyPage';
import NavBar from './components/NavBar/NavBar';
import styles from './App.less';

function App() {
  return (
    <div className={styles.App}>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={NoteForm}/>
          <Route exact path='/login' component={LogginForm}/>
          <Route exact path='/subscribe' component={SubscribeForm}/>
          <Route exact path='/my-page' component={MyPage}/>
        </Switch>
    </div>
  );
}

export default App;
