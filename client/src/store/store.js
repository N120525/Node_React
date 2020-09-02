import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "../reducers/redu_root";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware, compose } from "redux";
import redux_devtools_extension from "../redux-devtools-extension/redux-devtools";

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const persistConfig = {
  key: "root",
  storage
  // blacklist: ['your Reducer Name'] ,// Name of the Reducer will not be persisted
  // whitelist: ['your Reducer Name'] // only Name of the Reducer will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(...middlewares),
    redux_devtools_extension
  )
);
export let persistor = persistStore(store);
