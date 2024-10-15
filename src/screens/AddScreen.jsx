import { StyleSheet, Text, View, TextInput, ScrollView, Image, Alert, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemonAndSave } from '../redux/pokemonSlice';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';


const { width, height } = Dimensions.get('window');

export default function AddScreen() {
    const navigation = useNavigation();
    const[serial, setSerial] = useState('')
    const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [weakness, setWeakness] = useState('');
  const [strength, setStrength] = useState('');
  const [breed, setBreed] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemon.pokemonList || []);



  const generateId = () => {
    const currentCount = pokemons.length; // Get the current count of Pokémon
    const newId = currentCount + 1; // Increment the count
    return newId.toString().padStart(3, '0'); // Format as a string with leading zeros
  };

  const handleAdd = () => {
    if (!name || !weakness || !strength || !breed || !pokemonHeight || !weight || !description || !image) {
     ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      return;
    }
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
  const isDuplicateSerial = pokemons.some(pokemon => pokemon.serial === serial);
  if (isDuplicateSerial) {
    ToastAndroid.show('Serial number already exists', ToastAndroid.SHORT);
    return;
  }

    const newPokemon = {
      id: generateId(), 
      serial,
      type,
      name,
      weakness,
      strength,
      breed,
      height: pokemonHeight,
      weight,
      description,
      image,
    };

    dispatch(addPokemonAndSave(newPokemon));
    
    clearForm();
   
    //toast for success
    ToastAndroid.show('Pokémon added successfully!', ToastAndroid.SHORT);
    

    navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      });
 

  };

  const clearForm = () => {
    setSerial('')
    setName('');
    setWeakness('');
    setStrength('');
    setBreed('');
    setPokemonHeight('');
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
          setImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <>
      <View style={styles.header}>
      <Image source={require('../assets/header.png')} style={styles.headerImage1} />
        <Image source={require('../assets/pikachuPng.png')} style={styles.headerImage} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
        {image && (
          <View style={styles.imagePreviewContainer}>
        
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </View>
        )}

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
          <Text style={styles.label}>Weakness </Text>
          <TextInput
            style={styles.weaknessInput}
            value={weakness}
            onChangeText={setWeakness}
          />
        </View>

        <View style={styles.strengthInputContainer}>
          <Text style={styles.label}>Abilities </Text>
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
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>handleAdd()}>
          <Text style={styles.buttonText}>Add Pokémon</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: width * 0.04,
    backgroundColor: '#fff',
    paddingBottom: '20%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 5,
    borderWidth: 0.5,
    padding: height * 0.03,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  headerImage1: {
    width: width * 0.3,
    height: width * 0.2,
    resizeMode: 'contain',
    position: 'absolute',
    left: '5%',
  },
  headerImage: {
    width: width * 0.3,
    height: width * 0.2,
    resizeMode: 'contain',
    position: 'absolute',
    right: '0%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#E9724C',
    marginBottom: 5,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    letterSpacing:0.5
  },
  nameInputContainer: {
    marginBottom: width * 0.05,
  },
  nameInput: {
    fontSize: width * 0.04,
    height: width * 0.10,
    backgroundColor:'#f5f5f5',
    elevation:3,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
    
  },
  weaknessInputContainer: {
    marginBottom: width * 0.05,
  },
  weaknessInput: {
    fontSize: width * 0.04,
    height: width * 0.1,
    backgroundColor:'#f5f5f5',
    elevation:3,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
  },
  strengthInputContainer: {
    marginBottom: width * 0.05,
  },
  strengthInput: {
    fontSize: width * 0.04,
    height: width * 0.1,
    backgroundColor:'#f5f5f5',
    elevation:3,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
  },
  breedInputContainer: {
    marginBottom: width * 0.05,
    width: '100%',
  },
  breedInput: {
    fontSize: width * 0.04,
    height: width * 0.1,
    backgroundColor:'#f5f5f5',
    elevation:3,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
  },
  heightInputContainer: {
    marginBottom: width * 0.05,
    width: '48%',
  },
  heightInput: {
    fontSize: width * 0.04,
    height: width * 0.1,
    backgroundColor:'#f5f5f5',
    elevation:3,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
  },
  weightInputContainer: {
    marginBottom: width * 0.05,
    width: '48%',
  },
  weightInput: {
    fontSize: width * 0.04,
    height: width * 0.1,
    backgroundColor:'#f5f5f5',
    elevation:3,
  
    paddingHorizontal: width * 0.03,
  },
  descriptionInputContainer: {
    marginBottom: width * 0.05,
  },
  descriptionInput: {
    fontSize: width * 0.04,
    height: width * 0.2,
   backgroundColor:'#f5f5f5',
    borderRadius: 10,
    elevation:3,
    paddingHorizontal: width * 0.03,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0D63BF',
    padding: width * 0.04,
    borderRadius: 10,
    elevation: 5,
    marginTop: width * 0.03,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: width * 0.04,
    backgroundColor:'#0D63BF',
     height: width * 0.4,
     width: width * 0.4,
     borderRadius:100,
     elevation:5
  },
  imageContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  },
  previewText: {
    fontSize: width * 0.04,
    color: '#0D63BF',
  },
  imagePreview: {
    width: width*0.4,
    height: width*0.4,
    resizeMode: 'contain',
 
  },
});
