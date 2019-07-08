import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas/auth';

// Usefull for server side.
const hasWindow = typeof window === 'object';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
let store;

if (process.env.NODE_ENV === 'development' && hasWindow) {
  store = createStore(rootReducer, composeWithDevTools(middleware));
} else {
  store = createStore(rootReducer, middleware);
}

sagaMiddleware.run(rootSaga);

const finalStore = store;
export default finalStore;
