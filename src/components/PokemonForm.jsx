import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addPokemon, editPokemon } from '../redux/pokemonSlice';
import {v4 as uuidv4} from 'uuid-random'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const PokemonForm = ({ editData, setEditData }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setBreed(editData.breed);
      setDescription(editData.description);
    }
  }, [editData]);

  const handleSubmit = () => {
    if (editData) {
      dispatch(editPokemon({ id: editData.id, name, breed, description }));
    } else {
      dispatch(addPokemon({ id: uuidv4(), name, breed, description }));
    }
    setName('');
    setBreed('');
    setDescription('');
    setEditData(null);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title={editData ? "Edit Pokémon" : "Add Pokémon"} onPress={handleSubmit} />
      <FontAwesome name='glass' />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PokemonForm;
