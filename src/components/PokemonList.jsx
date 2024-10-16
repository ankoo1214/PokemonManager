import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loadPokemonData, savePokemonData } from '../redux/pokemonSlice'; 
import SearchBar from './SearchBar'; // Assuming you have this component

const { width, height } = Dimensions.get('window');

const PokemonList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const pokemonList = useSelector((state) => state.pokemon.pokemonList);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch Pokémon data when the component mounts
    useEffect(() => {
        dispatch(loadPokemonData());
    }, [dispatch]);

    const filteredData = pokemonList.filter(pokemon => 
      (pokemon.name && pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pokemon.serial && pokemon.serial.toString().includes(searchQuery))
  );

    // Render each Pokémon card
    const renderPokemon = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { width: width * 0.45 }]}
            onPress={() => navigation.navigate('Details', { pokemon: item })}
            accessibilityLabel={`View details of ${item.name}`}
        >
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image source={{uri:item.image}} style={styles.image} />
                ) : (
                    <Text style={styles.placeholderText}>No Image</Text>
                )}
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.id}>#{item.serial}</Text>
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SearchBar
                query={searchQuery}
                setQuery={setSearchQuery}
            />

            <FlatList
                data={filteredData}
                renderItem={renderPokemon}
                keyExtractor={item => item.serial}
                numColumns={2}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false} 
            />
         
         
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
     
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: '15%',
    },
    list: {
        justifyContent: 'space-between',
        paddingBottom: height * 0.05,
    },
    card: {
        backgroundColor: '#0D63BF',
        margin: '2%',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
        elevation:2
    },
    image: {
        width:width*0.3, 
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: height * 0.02,
    },
    id: {
        fontSize: width * 0.04, 
        fontWeight: 'bold',
        color: '#fff',
    },
    name: {
        fontSize: width * 0.04,
        color: '#fff',
        fontWeight: 'bold',
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: width * 0.02,
        backgroundColor: '#E9724C',
        borderRadius: 10,
        marginTop: height * 0.03,
        paddingVertical: height * 0.003,
    },
    imageContainer: {
        height: height * 0.12,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    clearButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PokemonList;
