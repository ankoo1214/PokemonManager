import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window'); 

function CustomHeader({ nav }) {
  const [color, setColor] = useState(null);

  return (
    <>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => {
            nav.goBack();
            setColor('#e6e6e6'); 
          }}
          onPressOut={() => {
            setColor(null); 
          }}
          style={[styles.arrow, { backgroundColor: color }]}>
          <Ionicons name="chevron-back-outline" size={width * 0.07} color={'#000000'} />
        </TouchableOpacity>

        <Image style={styles.logo} source={require('../assets/header.png')} />
      </View>
    </>
  );
}

export default CustomHeader;

const styles = StyleSheet.create({
  logo: {
    width: width * 0.2,
    resizeMode: 'contain',
    elevation: 30,
    height: height * 0.06, 
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  arrow: {
    position: 'absolute',
    left: height * 0.001,
    borderRadius: 50,
    backgroundColor: '#999999',
    height: height * 0.05, 
    width: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
