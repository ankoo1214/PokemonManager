import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './SearchBar';
const pokemonData = [
  { id: '001', name: 'Bulbasaur', image: require('../assets/bulbasaur.png') },
  { id: '002', name: 'Ivysaur', image: require('../assets/ivysaur.png') },
  { id: '003', name: 'Venusaur', image: require('../assets/venusaur.png') },
  { id: '004', name: 'Charman', image: require('../assets/charman.png') },
  { id: '005', name: 'Charizard', image: require('../assets/charizar.png') },
  { id: '006', name: 'Squirtle', image: require('../assets/squirtle.png') },
  { id: '007', name: 'Wartortle', image: require('../assets/wartortle.png') },
  { id: '007', name: 'Charmele', image: require('../assets/charmele.png') }
];

// Get device dimensions for responsive design
const { width, height } = Dimensions.get('window');

const PokemonList = () => {
    const navigation = useNavigation();
  
    const renderPokemon = ({ item }) => (
      <TouchableOpacity 
        style={[styles.card, { width: width * 0.45 }]} 
        onPress={() => navigation.navigate('Details', { pokemon: item })}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.id}>#{item.id}</Text>
        <Text style={styles.name}>{item.name}</Text>
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
    backgroundColor: '#f5f5f5',
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:'5%'
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
    backgroundColor: '#f49ac2',
    margin: '2%',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: height * 0.02, // Dynamic padding
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
    fontSize: width * 0.035, // Dynamic font size
    color: '#fff',
  }
});

export default PokemonList;
