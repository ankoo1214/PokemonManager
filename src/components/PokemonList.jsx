import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './SearchBar';
import pokemonData from './pokemonData';


const { width, height } = Dimensions.get('window');

const PokemonList = () => {
    const navigation = useNavigation();
  
    const renderPokemon = ({ item }) => (
      <TouchableOpacity 
        style={[styles.card, { width: width * 0.45 }]} 
        onPress={() => navigation.navigate('Details', { pokemon: item })}
      >
        <View style ={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        </View>
       
        <View style ={styles.nameContainer}>
        <Text style={styles.id}>#{item.id}</Text>
        <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  

  return (
    <View style={styles.container}>

     <SearchBar/>
      <FlatList
        data={pokemonData}
        renderItem={renderPokemon}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    paddingHorizontal: '1%',
    backgroundColor: '#FFFFFF',
    justifyContent:'center',
  
    paddingBottom:'25%'
  },
  title: {
    fontSize: width * 0.06, // Dynamic font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.05, // Dynamic margin
    marginBottom: height * 0.03, // Dynamic margin
  },
  list: {
    justifyContent: 'space-between',
    paddingBottom: height * 0.05, // Dynamic padding
  },
  card: {
    backgroundColor: '#0D63BF',
    margin: '2%',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal:width *0.02
  },
  image: {
    width: '5%',
    aspectRatio: 1,
    resizeMode:'contain',
    marginBottom: height * 0.02, 
  },
  id: {
    fontSize: width * 0.04, // Dynamic font size
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight:'bold'
  },
nameContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    paddingHorizontal:width*0.03,
    backgroundColor:'#E9724C',
    borderRadius:10,
    paddingVertical:height*0.003
},
imageContainer:{
    height:height*0.12
}
});

export default PokemonList;
