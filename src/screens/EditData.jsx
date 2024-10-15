import { StyleSheet, Text, View, TextInput, ScrollView, Image, Alert, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'; 

const STORAGE_KEY = 'POKEMON_DATA';
const { width, height } = Dimensions.get('window');

export default function EditData() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pokemon } = route.params; // Get pokemon data from route params

  // Set initial state values from pokemon data
  const [name, setName] = useState(pokemon.name || '');
  const [weakness, setWeakness] = useState(pokemon.weakness.join(', ') || '');
  const [strength, setStrength] = useState(pokemon.strength.join(', ') || '');
  const [breed, setBreed] = useState(pokemon.breed || '');
  const [pokemonHeight, setPokemonHeight] = useState(pokemon.height || ''); 
  const [gender, setGender] = useState(pokemon.gender || '');
  const [weight, setWeight] = useState(pokemon.weight || '');
  const [description, setDescription] = useState(pokemon.description || '');
  const [image, setImage] = useState(pokemon.image || null);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    loadPokemonData();
  }, []);

  const loadPokemonData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setPokemonList(data);
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  };

  const handleAdd = async () => {
    // Validation: check if all fields are filled
    if (!name || !weakness || !strength || !breed || !pokemonHeight || !gender || !weight || !description) {
      Alert.alert('Error', 'Please fill in all fields before adding a Pokémon');
      return;
    }

    const updatedPokemon = {
      id: pokemon.id, // Use the same ID for editing
      name,
      weakness: weakness.split(',').map(item => item.trim()),
      strength: strength.split(',').map(item => item.trim()),
      breed,
      height: pokemonHeight,
      gender,
      weight,
      description,
      image: image ? image.uri : pokemon.image, // Use new image if selected, else keep the old one
    };

    const updatedPokemonList = pokemonList.map(p => p.id === pokemon.id ? updatedPokemon : p); // Update the existing Pokémon

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPokemonList));
      setPokemonList(updatedPokemonList);
      clearForm();
      Alert.alert('Success', 'Pokémon updated successfully!');
      navigation.goBack(); // Navigate back after saving
    } catch (e) {
      console.error('Failed to save data:', e);
      Alert.alert('Error', 'Failed to save Pokémon data');
    }
  };

  const clearForm = () => {
    setName('');
    setWeakness('');
    setStrength('');
    setBreed('');
    setPokemonHeight('');
    setGender('');
    setWeight('');
    setDescription('');
    setImage(null);
  };

  const selectImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setImage(response.assets[0]); // Set the new image
        }
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Preview */}
      <View style={styles.imageContainer}>
      {image ? (
        <View style={styles.imagePreviewContainer}>
      
          <Image source={image} style={styles.imagePreview} />
        </View>
      ) : (
        pokemon.image && (
          <View style={styles.imagePreviewContainer}>
          
            <Image source={require('../assets/header.png')} style={styles.imagePreview} />
          </View>
        )
      )}
      </View>
     

      <View style={styles.nameInputContainer}>
        <Text style={styles.label}>Pokémon Name</Text>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.weaknessInputContainer}>
        <Text style={styles.label}>Weakness</Text>
        <TextInput
          style={styles.weaknessInput}
          value={weakness}
          onChangeText={setWeakness}
        />
      </View>

      <View style={styles.strengthInputContainer}>
        <Text style={styles.label}>Strength</Text>
        <TextInput
          style={styles.strengthInput}
          value={strength}
          onChangeText={setStrength}
        />
      </View>

      <View style={styles.breedInputContainer}>
        <Text style={styles.label}>Breed</Text>
        <TextInput
          style={styles.breedInput}
          value={breed}
          onChangeText={setBreed}
        />
      </View>

      {/* Row for Height and Weight */}
      <View style={styles.rowContainer}>
        <View style={styles.heightInputContainer}>
          <Text style={styles.label}>Height (in meter)</Text>
          <TextInput
            style={styles.heightInput}
            value={pokemonHeight}
            onChangeText={setPokemonHeight}
          />
        </View>

        <View style={styles.weightInputContainer}>
          <Text style={styles.label}>Weight (in kg)</Text>
          <TextInput
            style={styles.weightInput}
            value={weight}
            onChangeText={setWeight}
          />
        </View>
      </View>

      <View style={styles.descriptionInputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Change Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: width * 0.04,
      backgroundColor: '#fff',
      paddingBottom: '20%',
    },
    label: {
      color: '#E9724C',
      marginBottom: 5,
      fontSize: width * 0.045,
      fontWeight: 'bold',
    },
    nameInputContainer: {
      marginBottom: width * 0.05,
    },
    nameInput: {
      height: width * 0.1,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, // Add elevation
      backgroundColor: '#fff', // Ensure background color is set for elevation
    },
    weaknessInputContainer: {
      marginBottom: width * 0.05,
    },
    weaknessInput: {
      height: width * 0.1,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, // Add elevation
      backgroundColor: '#fff',
    },
    strengthInputContainer: {
      marginBottom: width * 0.05,
    },
    strengthInput: {
      height: width * 0.1,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#fff',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    breedInputContainer: {
      marginBottom: width * 0.05,
      width: '100%',
    },
    breedInput: {
      height: width * 0.1,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, // Add elevation
      backgroundColor: '#fff',
    },
    heightInputContainer: {
      marginBottom: width * 0.05,
      width: '48%',
    },
    heightInput: {
      height: width * 0.1,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#fff',
    },
    weightInputContainer: {
      marginBottom: width * 0.05,
      width: '48%',
    },
    weightInput: {
      height: width * 0.1,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#ffffff',
    },
    descriptionInputContainer: {
      marginBottom: width * 0.05,
    },
    descriptionInput: {
      height: width * 0.1,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#ffffff',
    },
    imagePreviewContainer: {
      alignItems: 'center',
      borderRadius: 100,
      height: width * 0.5,
      width: width * 0.5,
      marginBottom: width * 0.05,
      backgroundColor: '#0D63BF',
      elevation: 5,
    },
    previewText: {
      marginBottom: 5,
      fontSize: width * 0.045,
      fontWeight: 'bold',
    },
    imagePreview: {
      width: width * 0.4,
      height: height * 0.2,
      borderRadius: 10,
      resizeMode: 'contain',
      marginBottom: width * 0.05,
    },
    button: {
      backgroundColor: '#0D63BF',
      paddingVertical: width * 0.03,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: width * 0.03,
      
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
