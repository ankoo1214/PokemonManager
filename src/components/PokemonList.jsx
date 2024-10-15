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

    // Sample Pokémon data
    const samplePokemon = {
        name: 'Ankushhh',
        image: require('../assets/venusaur.png'),
        weakness: ['Fire', 'Flying', 'Ice', 'Psychic'],
        strength: ['Water', 'Electric', 'Grass'],
        breed: 'Seed Pokémon',
        height: '2.0 m',
        weight: '100.0 kg',
        description: 'Venusaur has a large flower on its back, which is said to take on vivid colors if it gets plenty of nutrition and sunlight. Its flower releases a soothing scent.'
    };

    // Function to add a new Pokémon
    const handleAddPokemon = async () => {
        const newPokemonWithId = {
            ...samplePokemon,
            id: generatePokemonId() // Assign a sequential ID
        };
        dispatch(addPokemon(newPokemonWithId)); // Dispatch the action to add Pokémon
        await dispatch(savePokemonData([...pokemonList, newPokemonWithId])); // Save to AsyncStorage
    };

    // Function to generate a sequential ID like '001', '002', etc.
    const generatePokemonId = () => {
        const nextId = pokemonList.length + 1;
        return nextId.toString().padStart(3, '0'); // Pad with zeros up to 3 digits
    };

    // Filter the data based on search query with a safety check for 'name'
    const filteredData = pokemonList.filter(pokemon =>
        pokemon.name && pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Render each Pokémon card
    const renderPokemon = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { width: width * 0.45 }]}
            onPress={() => navigation.navigate('Details', { pokemon: item })}
            accessibilityLabel={`View details of ${item.name}`} // Accessibility label
        >
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image source={{uri:item.image}} style={styles.image} />
                ) : (
                    <Text style={styles.placeholderText}>No Image</Text>
                )}
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.id}>#{item.id}</Text>
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
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
            />
         
         
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '1%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingBottom: '25%',
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
    },
    image: {
        width:width*0.3, 
        aspectRatio: 1,
        resizeMode: 'contain',
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
        fontWeight: 'bold',
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: width * 0.03,
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
