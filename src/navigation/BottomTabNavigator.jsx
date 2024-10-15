import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Animated, StyleSheet, View, Dimensions } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Get the dimensions of the screen
const { width, height } = Dimensions.get('window');

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
        <View style={styles.circleBackground}>
          {children}
        </View>
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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Hide labels for cleaner look
        tabBarStyle: {
          height: height * 0.08, 
          width: '100%', 
          paddingTop: height * 0.01,
          backgroundColor: '#f5f5f5', 
          borderTopWidth: 0, 
          position: 'absolute', 
          bottom: 0,
          elevation: 5, 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
        },
        tabBarActiveTintColor: '#0D63BF',
        tabBarInactiveTintColor: '#777777',
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
              <Ionicons name="add-circle" size={width * 0.15} color="#E9724C" />
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
    top: '-20%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10, // android shadow
  },
  circleBackground: {
    width: width * 0.18, 
    height: width * 0.18, 
    borderRadius: (width * 0.18) / 2, 
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // shadow effect
  },
});
