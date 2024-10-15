import { StyleSheet, Text, View, TextInput, ScrollView, Image, Alert, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
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
  const [serial, setSerial] = useState(pokemon.serial||'');
  const [type, setType] = useState(pokemon.type||'')
  const [name, setName] = useState(pokemon.name || '');
  const [weakness, setWeakness] = useState(pokemon.weakness || '');
  const [strength, setStrength] = useState(pokemon.strength || '');
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
  
 // Check if serial number is exactly 4 digits
 if (!/^\d{4}$/.test(serial)) { // Regex to match exactly 4 digits
    ToastAndroid.show('Serial number must be exactly 4 digits', ToastAndroid.SHORT);
    return;
  }
    if (isNaN(weight)) {
        ToastAndroid.show('Height and weight must be valid numbers', ToastAndroid.LONG);
        return;
      }
          // Check for duplicate serial number
          const isDuplicateSerial = pokemonList.some(p => p.serial === serial && p.id !== pokemon.id);
          if (isDuplicateSerial) {
            ToastAndroid.show('Serial number already exists', ToastAndroid.SHORT);
            return;
          }
  
    const updatedPokemon = {
        id: pokemon.id, // Use the same ID for editing
        serial,
        type,
        name,
        weakness,
        strength,
        breed,
        height: pokemonHeight,
        gender,
        weight,
        description,
        image: image && image.uri ? image.uri : pokemon.image, 
      };
      
  
    // Update the list of Pokémon by replacing the edited Pokémon
    const updatedPokemonList = pokemonList.map(p => p.id === pokemon.id ? updatedPokemon : p);
  
    try {
      // Save updated list to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPokemonList));
      setPokemonList(updatedPokemonList);
    //   clearForm();
    ToastAndroid.show('Pokémon updated successfully!', ToastAndroid.SHORT);
     
    } catch (e) {
      console.error('Failed to save data:', e);
      Alert.alert('Error', 'Failed to save Pokémon data');
    }
    navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      });
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
      <View style={styles.imageContainer}>
  {image && image.uri ? (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: image.uri }} style={styles.imagePreview} />
    </View>
  ) : pokemon.image ? (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: pokemon.image }} style={styles.imagePreview} />
    </View>
  ) : (
    <Text>No Image Available</Text>
  )}
</View>

      </View>
     
      <View style={styles.nameInputContainer}>
        <Text style={styles.label}>Serial Number</Text>
        <TextInput
          style={styles.nameInput}
          value={serial}
          onChangeText={setSerial}
        />
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
        <Text style={styles.label}>Abilities</Text>
        <TextInput
          style={styles.strengthInput}
          value={strength}
          onChangeText={setStrength}
        />
      </View>

      <View style={styles.rowContainer}>
      <View style={styles.heightInputContainer}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.breedInput}
            value={breed}
            onChangeText={setBreed}
          />
        </View>
        <View style={styles.weightInputContainer}>
            <Text style={styles.label}>Type</Text>
            <TextInput
              style={styles.weightInput}
              value={type}
              onChangeText={setType}
            />
          </View>
      </View>

      {/* Row for Height and Weight */}
      <View style={styles.rowContainer}>
        <View style={styles.heightInputContainer}>
          <Text style={styles.label}>Height (in ft)</Text>
          <TextInput
            style={styles.heightInput}
            value={pokemonHeight}
            onChangeText={setPokemonHeight}
          />
        </View>

        <View style={styles.weightInputContainer}>
          <Text style={styles.label}>Weight (in lbs)</Text>
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
      paddingBottom: '5%',
    },
    label: {
      color: '#E9724C',
      marginBottom: 5,
      fontSize: width * 0.04,
      fontWeight: 'bold',
    },
    nameInputContainer: {
      marginBottom: width * 0.05,
    },
    nameInput: {
      height: width * 0.1,
      fontSize: width * 0.04,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, // Add elevation
      backgroundColor: '#f5f5f5', // Ensure background color is set for elevation
    },
    weaknessInputContainer: {
      marginBottom: width * 0.05,
    },
    weaknessInput: {
      height: width * 0.1,
      fontSize: width * 0.04,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, // Add elevation
      backgroundColor: '#f5f5f5',
    },
    strengthInputContainer: {
      marginBottom: width * 0.05,
    },
    strengthInput: {
      height: width * 0.1,
      fontSize: width * 0.04,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#f5f5f5',
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
      fontSize: width * 0.04,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, // Add elevation
      backgroundColor: '#f5f5f5',
    },
    heightInputContainer: {
      marginBottom: width * 0.05,
      width: '48%',
    },
    heightInput: {
      height: width * 0.1,
      fontSize: width * 0.04,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#f5f5f5',
    },
    weightInputContainer: {
      marginBottom: width * 0.05,
      width: '48%',
    },
    weightInput: {
      height: width * 0.1,
      fontSize: width * 0.04,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#f5f5f5',
    },
    descriptionInputContainer: {
      marginBottom: width * 0.05,
    },
    descriptionInput: {
      height: width * 0.1,
      fontSize: width * 0.04,
      borderRadius: 5,
      paddingHorizontal: width * 0.03,
      elevation: 5, 
      backgroundColor: '#f5f5f5',
    },
    imagePreviewContainer: {
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 100,
      height: width * 0.4,
      width: width * 0.4,
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
      width: width * 0.25,
      height: height * 0.2,
      borderRadius: 10,
      resizeMode: 'contain',
     
    },
    button: {
      backgroundColor: '#0D63BF',
      paddingVertical: width * 0.03,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: width * 0.03,
      padding: width * 0.04,
      elevation:5
      
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
