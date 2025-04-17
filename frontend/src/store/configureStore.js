import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import products from "../reducers/products";
import recommended_products from '../reducers/recommendedProducts';
import auth from "../reducers/auth";
import users from "../reducers/users";
import categories from "../reducers/categories";
import orders from "../reducers/orders";
import profile from "../reducers/profile";
import cartProducts from "../reducers/cart";
import reviews from '../reducers/reviews';
import brands from '../reducers/brands';
import current_gender from '../reducers/current_gender';

export default function configureStore(history, initialState) {
  const reducers = {
    products,
    reviews,
    auth,
    users,
    categories,
    orders,
    profile,
    cartProducts,
    recommended_products,
    brands,
    current_gender
    };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];
  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
