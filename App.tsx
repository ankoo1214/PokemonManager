
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaView } from 'react-native';
import StackNavigator from './src/navigation/StackNavigation';

function App() {
  return (

      <StackNavigator/>


  );
}
export default App;