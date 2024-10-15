
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CustomeHeader from '../components/CustomHeader';
import BottomTabNavigator from './BottomTabNavigator';
import EditData from '../screens/EditData';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen name="HomeTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen}
        options={{header:()=><CustomeHeader></CustomeHeader>}}
        />
        <Stack.Screen name="Details" component={DetailScreen}
         options={{header:({navigation})=><CustomeHeader nav={navigation}></CustomeHeader>}} />
         <Stack.Screen name="EditData" component={EditData}
         options={{header:({navigation})=><CustomeHeader nav={navigation}></CustomeHeader>}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
