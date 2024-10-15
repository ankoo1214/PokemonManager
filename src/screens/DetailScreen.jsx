import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deletePokemonAndSave } from '../redux/pokemonSlice';
const { width, height } = Dimensions.get('window');

const DetailScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
  const route = useRoute();
  const { pokemon } = route.params;
  const handleEdit = () => {
    navigation.navigate('EditData', {  pokemon: {
        id: pokemon.id,
        name: pokemon.name,
        weakness: pokemon.weakness,
        strength: pokemon.strength,
        breed: pokemon.breed,
        height: pokemon.height,
        gender: pokemon.gender,
        weight: pokemon.weight,
        description: pokemon.description,
        image: pokemon.image, // Ensure image is passed
      }, }); 
  };
  const handleDelete = () => {
    dispatch(deletePokemonAndSave(pokemon.id)); // Dispatch the delete action
    navigation.goBack(); // Go back after deletion
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pokemonInfo}>
        <View style={styles.idContainer}>
          <Text style={styles.pokemonNumber}>#{pokemon.id}</Text>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </View>
        <View style={styles.imageContainer}>
  {pokemon.image ? (
    <Image
      style={styles.pokemonImage}
      source={typeof pokemon.image === 'string' ? { uri: pokemon.image } : pokemon.image}
    />
  ) : (
    <Text style={styles.placeholderText}>No Image Available</Text>
  )}
</View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={()=>handleEdit()}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={()=>handleDelete()
          }>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{pokemon.height}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Breed</Text>
            <Text style={styles.statValue}>{pokemon.breed}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{pokemon.weight}</Text>
          </View>
        
        </View>
        <View style={styles.weaknesAbilityContainer}>
          <View style={styles.weaknessContainer}>
            <Text style={styles.weaknessLabel}>Weakness</Text>
            <Text style={styles.weakness}>{pokemon.weakness.join(', ')}</Text>
          </View>
          <View style={styles.abilityContainer}>
            <Text style={styles.abilityLabel}>Abilities</Text>
            <Text style={styles.ability}>{pokemon.strength.join(', ')}</Text>
          </View>
          <View>
            <Text style={styles.description}>Description</Text>
            <Text>{pokemon.description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9724C',
    padding: width * 0.04,
  },
  pokemonInfo: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,

  },
  pokemonNumber: {
    fontSize: width * 0.05,
    color: '#FF4500',
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',

  },
  pokemonImage: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: height * 0.02,
    resizeMode: 'contain',
  },
  deleteButton: {
    backgroundColor: '#ff5733',
    width: '45%',
    paddingVertical: '3%',
    borderRadius: 10,
    elevation: 5,
  },
  editButton: {
    backgroundColor: '#0096FF',
    width: '45%',
    paddingVertical: '3%',
    borderRadius: 10,
    elevation: 5,
  },
  editText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  statsContainer: {
    marginVertical: height * 0.02,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.01,
  },
  statLabel: {
    fontSize: width * 0.04,
    color: '#333',
  },
  statValue: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  weaknesAbilityContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: width * 0.02,
  },
  weaknessContainer: {
    marginBottom: height * 0.02,
  },
  weaknessLabel: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  weakness: {
    fontSize: width * 0.04,
    color: '#333333',
  },
  abilityContainer: {
    marginBottom: height * 0.02,
  },
  abilityLabel: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  ability: {
    fontSize: width * 0.04,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D63BF',
    marginVertical: height * 0.01,
    borderRadius: 20,
    paddingVertical: '1%',
  },
  idContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.02,
  },
  description: {
    color: '#676767',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
