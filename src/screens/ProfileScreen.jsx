import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const pokemonList = useSelector((state) => state.pokemon.pokemonList);
  const totalPokemon = pokemonList.length;

  const user = {
    profilePicture: require('../assets/ash.jpg'),
    name: 'Ash',
   
  };

  return (
    <>
    <View style={styles.logoContainer}>
      
      <Image style={styles.logo} source={require('../assets/header.png')} />
    </View>

    <ScrollView contentContainerStyle={styles.container}>
       
        <View style={styles.nameContainer}>
        <View style={styles.imageContainer}>
        <Image source={user.profilePicture} style={styles.profileImage} />
        </View>
        <View style={styles.nameTextContainer}>
        <Text style={styles.nameText}>{user.name}</Text>
        </View>
       
     

        </View>
     




      <View style={styles.favoritePokemonContainer}>
        <Text style={styles.favoritePokemonText}>Favorite Pokémon</Text>
        <Text style={styles.pokemonNameText}>Pikachu</Text>

        <Image source={require('../assets/pikachuPng.png')} style={styles.pokemonImage} />
      </View>
      <View style={styles.pokemonCountContainer}>
    <Text style={styles.pokemonCountText}>Total Pokémon:</Text>
    <Text style={styles.pokemonCountNumber}>{totalPokemon}</Text>
  </View>
    </ScrollView>  
     </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
   
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#ffffff',
    gap:height*0.04
  },
  nameContainer:{
    backgroundColor:'#0d63bf',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    borderRadius:10,
    elevation:10,
    padding:width*0.05
  },
  imageContainer: {
    width:width* 0.32,
    height:width* 0.32,
    borderColor: '#E9724C',
 
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: (width * 0.4) / 2,
    borderWidth: 2,

  
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.4) / 2,
    resizeMode:'contain',
    
    
  },
  userInfoContainer: {
    backgroundColor: '#0d63bf',
    borderRadius: 10,
    padding: width * 0.04,
    shadowColor: '#000',
    
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,

    alignItems: 'center',
    width: '100%',
   
  },
  nameTextContainer:{
    paddingHorizontal:width*0.1,
   height:height* 0.04,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#E9724C',
    borderRadius:20,
    elevation:5
    
  },
  nameText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign:'left'
  },
 
  
 
  pokemonCountText: {
    fontSize: width * 0.045,
    color: '#4CAF50',
    marginTop: height * 0.01,
  },
  favoritePokemonContainer: {

    alignItems: 'center',
    backgroundColor: '#0d63bf',
    borderRadius: 10,
    padding: width * 0.05,
    shadowColor: '#000',
    
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    width: '100%',
   
  },
  favoritePokemonText: {
    fontSize: width * 0.045,
    
    color: '#ffffff',
  },
  pokemonNameText: {
    fontSize: width * 0.04,
    color: '#ffffff',
    backgroundColor:'#0d63bf',
    fontWeight:'bold',
    paddingHorizontal:width*0.03,
    borderRadius:20,
    
    marginTop: height * 0.005,
  },
  pokemonImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    marginTop: height * 0.01,
    
    borderColor: '#E9724C',
    backgroundColor:'#fff'
  },
  logo: {
    width: width * 0.3,
    resizeMode: 'contain',

    height: height * 0.08, 
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 10,
    borderBottomWidth:0.2,

  },

    
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginVertical: height * 0.01, 
    },
    ageText: {
      fontSize: width * 0.045,
      color: '#ffffff',
      fontWeight:'bold'
    },
    genderText: {
      fontSize: width * 0.045,
      color: '#ffffff',
      fontWeight:'bold'
    },
    countryText: {
      fontSize: width * 0.045,
      color: '#ffffff',
      fontWeight:'bold'
    },
    pokemonCountContainer:{
        backgroundColor:'#e9724c',
        elevation:3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems:'center',
       padding: height * 0.01,
       borderRadius:10,
  

    },
    pokemonCountText: {
      fontSize: width * 0.045,
      color: '#ffffff',
      fontWeight:'bold',

    },
    pokemonCountNumber: {
        fontSize: width * 0.045,
        padding:width * 0.015,
        paddingHorizontal:width*0.033,
        color: '#ffffff',
        fontWeight:'bold',
        borderRadius:40,
        backgroundColor:'#0d63bf',
        
      },
  });
  
  

