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

import {NavigationContainer} from '@react-navigation/native'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Thunk from 'redux-thunk'
import AuthStack from './src/navigation/AuthStack'

const App= () => {
  const store=createStore()
  return (
    <Provider>
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
    </Provider>
  
  );
};



export default App;
