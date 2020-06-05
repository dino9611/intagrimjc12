/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';


import 'react-native-gesture-handler'

import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import Reducers from './src/redux/Reducers'

import thunk from 'redux-thunk';
import OneSignal from 'react-native-onesignal';
import Appinit from './Appinit'

class App extends React.Component {
  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging 
    // OneSignal.setLogLevel(6, 0);
    
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("fbec40e5-2d70-4792-841e-f54876f1cdaa", {kOSSettingsKeyAutoPrompt : true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    
    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
  
     OneSignal.addEventListener('received', this.onReceived);
     OneSignal.addEventListener('opened', this.onOpened);
     OneSignal.addEventListener('ids', this.onIds);
  }
    componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
    }
  
    onReceived(notification) {
      console.log("Notification received: ", notification);
    }
  
    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }
  
    onIds(device) {
      console.log('Device info: ', device);
    }
  
  render() { 
    console.disableYellowBox=true
    const store=createStore(Reducers,{},applyMiddleware(thunk))
    return (
      <Provider store={store}>
        <Appinit/>
      </Provider>
    
    );
  }
}
 
export default App;

