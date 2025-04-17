import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/auth';
import { setProducts } from './actions/cart';
import { set_current_gender } from './actions/current_gender';
import jwt from 'jsonwebtoken';
import './index.css';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

if (localStorage.jwtToken) {
  let token = localStorage.jwtToken;
  let user = jwt.decode(token);
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(user));
}

if (localStorage.cart) {
  let cart = Array.from(JSON.parse(localStorage.cart));
  store.dispatch(setProducts(cart));
}
if(localStorage.current_gender){
  let current_gender = localStorage.current_gender;
  store.dispatch(set_current_gender(current_gender));
}
else{
  localStorage.setItem('current_gender','man');
  store.dispatch(set_current_gender("man"));
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement);

registerServiceWorker();
