import { StyleSheet, View, Image, Dimensions, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function SearchBar({ query, setQuery }) {
  const [isInputVisible, setInputVisible] = useState(false); // State to manage input visibility
  const inputWidth = useRef(new Animated.Value(0)).current; // Animated value for input width

  const toggleInputVisibility = () => {
    if (isInputVisible) {
      // If currently visible, collapse the input
      Animated.timing(inputWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setInputVisible(false)); // Set visibility to false after animation
      setQuery(''); // Clear the query when hiding
    } else {
      // If not visible, show the input
      setInputVisible(true);
      Animated.timing(inputWidth, {
        toValue: width * 0.4, // Desired width for TextInput
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        // Automatically focus after input becomes visible
        if (isInputVisible) {
          Keyboard.dismiss(); // Dismiss the keyboard when hiding
        }
      });
    }
  };

  const handleOutsidePress = () => {
    if (isInputVisible) {
      toggleInputVisibility(); // Collapse the input
      Keyboard.dismiss(); // Dismiss the keyboard
    }
  };

  const handleInputChange = (text) => {
    setQuery(text); // Update the search query
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View>
          <Image style={styles.headerImage} source={require('../assets/header.png')} />
        </View>
        <View style={styles.searchContainer}>
          <Animated.View style={{ width: inputWidth, overflow: 'hidden' }}>
            {isInputVisible && ( // Conditionally render the TextInput
              <TextInput
                style={styles.input}
                placeholder="Search..."
                autoFocus // Automatically focus when visible
                onChangeText={handleInputChange} // Handle text changes
                value={query} // Controlled component
              />
            )}
          </Animated.View>
          <TouchableOpacity onPress={toggleInputVisibility} accessibilityLabel="Toggle search input">
            <Ionicons name='search' color='#000' size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: "3%",
    backgroundColor: '#ffffff',

    
  },
  headerImage: {
    width: width * 0.3,
    resizeMode: 'contain',
    height: height * 0.08,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40, // Set a fixed height for the input
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 10, // Add padding for better text visibility
    marginRight: 10, // Add margin to separate input and button
  },
});
