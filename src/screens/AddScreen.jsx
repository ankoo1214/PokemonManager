import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'POKEMON_DATA';

export default function AddScreen() {
  const [name, setName] = useState('');
  const [weakness, setWeakness] = useState('');
  const [strength, setStrength] = useState('');
  const [breed, setBreed] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
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
    const newPokemon = {
      id: String(Math.random()), // Generate a random ID
      name,
      weakness: weakness.split(',').map(item => item.trim()), // Convert to array
      strength: strength.split(',').map(item => item.trim()), // Convert to array
      breed,
      height,
      gender,
      weight,
      description,
      image, // Include the image in the new Pokémon object
    };

    const updatedPokemonList = [...pokemonList, newPokemon];

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPokemonList));
      setPokemonList(updatedPokemonList);
      clearForm();
      Alert.alert('Success', 'Pokémon added successfully!');
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
    setHeight('');
    setGender('');
    setWeight('');
    setDescription('');
    setImage(null); // Clear the selected image
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
          setImage(response.assets[0]); // Store the selected image
        }
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.title}>Add Pokémon</Text>
        <Image source={require('../assets/pikachuPng.png')}></Image>
        </View>
     

      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Weakness (comma separated)"
        value={weakness}
        onChangeText={setWeakness}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Strength (comma separated)"
        value={strength}
        onChangeText={setStrength}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Height"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Weight"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}

      <Button title="Add Pokémon" onPress={handleAdd} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center', // Center the image
  },
});
