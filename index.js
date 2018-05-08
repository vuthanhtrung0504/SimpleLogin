import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, View } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import saga from './src/sagas';
import Root from './App';
import reducer from './src/reducers';
import Loader from './src/components/Loader';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'],
};

const persistedReducer = persistCombineReducers(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

let store = createStore(persistedReducer, compose(applyMiddleware(sagaMiddleware)));

let persistor = persistStore(store);

sagaMiddleware.run(saga);

const App = () => (
    <Provider store={store}>
      <PersistGate loading={<Loader visible={true} />} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );

AppRegistry.registerComponent('RNProjectStructure', () => App);
