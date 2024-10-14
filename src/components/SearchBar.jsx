import { StyleSheet, Text, View , Image, Dimensions} from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
export default function SearchBar() {
  return (
    <View>
        <Image style={styles.headerImage}  source={require('../assets/header.png')}/>
     
    </View>
  )
}

const styles = StyleSheet.create({
    
  headerImage:{
    width:width * 0.3,
    resizeMode:'contain',
    height:height * 0.08,
  
  }
})