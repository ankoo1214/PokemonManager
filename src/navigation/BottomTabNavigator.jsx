import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();


const CustomAddButton = ({ children, onPress }) => {
  const scaleValue = new Animated.Value(1); // Initial scale value for animation

  const onButtonPressIn = () => {

    Animated.spring(scaleValue, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const onButtonPressOut = () => {
    // Expand back to normal size on press out
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={styles.customButton}
      onPress={onPress}
      onPressIn={onButtonPressIn}
      onPressOut={onButtonPressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Add') {
            iconName = 'add-circle'; // Custom for the center
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Hide labels for cleaner look
        tabBarStyle: [
          {
            height: '8%', // Custom height of the tab bar
            width: '100%', // Full width (You can adjust if needed)
         
            paddingTop: '1%',
            backgroundColor: 'white', // Customize the background color if needed
            borderTopWidth: 0, // Remove top border if needed
            position: 'absolute', // Ensure the tab bar is above content
            bottom: 0,
            elevation: 5, // Shadow on Android
            shadowColor: '#000', // Shadow on iOS
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
          },
          null,
        ],
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
   
      
      {/* Custom Tab Button for Add in the center */}
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarButton: (props) => (
            <CustomAddButton {...props}>
              <Ionicons name="add-circle" size={60} color="tomato" />
            </CustomAddButton>
          ),
        }}
      />

     
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  customButton: {
    top: '-10%', 
    
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10, //android shadow
  },
});
