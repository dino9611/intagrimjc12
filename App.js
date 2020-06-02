/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import 'react-native-gesture-handler'

import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import Reducers from './src/redux/Reducers'

import thunk from 'redux-thunk';

import Appinit from './Appinit'
const App= () => {
  console.disableYellowBox=true
  const store=createStore(Reducers,{},applyMiddleware(thunk))
  return (
    <Provider store={store}>
      <Appinit/>
    </Provider>
  
  );
};



export default App;
