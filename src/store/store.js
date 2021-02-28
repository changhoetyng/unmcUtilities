import {createStore,combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {LOG_OUT} from './types/userTypes'
import userReducer from './reducers/userReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
//   blacklist: ['userReducer'] 
};

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    // AsyncStorage.getAllKeys().then(keys => console.warn(keys))
    persistConfig.storage.removeItem('persist:root');
    state = undefined;
  }

  return appReducer(state, action);
};

const appReducer = combineReducers({
  userReducer: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

export {store, persistor};