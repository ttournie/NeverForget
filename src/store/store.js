import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// Usefull for server side.
const hasWindow = typeof window === "object";

const middleware = applyMiddleware(promise, thunk);
let store;

if (process.env.NODE_ENV === "development" && hasWindow) {
  store = createStore(rootReducer, composeWithDevTools(middleware));
} else {
  store = createStore(rootReducer, middleware);
}

export default store;
