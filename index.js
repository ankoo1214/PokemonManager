/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './src/redux/store';
import App from './App';
import { name as appName } from './app.json';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native';

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
  
    <App />

     
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
