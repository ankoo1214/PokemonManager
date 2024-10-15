import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const pokemonList = useSelector((state) => state.pokemon.pokemonList);
  const totalPokemon = pokemonList.length;

  const user = {
    profilePicture: require('../assets/ash.jpg'),
    name: 'Ash',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    age: 25,
    gender: 'Male',
    country: 'Japan',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={user.profilePicture} style={styles.profileImage} />
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.nameText}>{user.name}</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <Text style={styles.phoneText}>{user.phone}</Text>
        <Text style={styles.ageText}>Age: {user.age}</Text>
        <Text style={styles.genderText}>Gender: {user.gender}</Text>
        <Text style={styles.countryText}>Country: {user.country}</Text>
        <Text style={styles.pokemonCountText}>Total Pokémon: {totalPokemon}</Text>
      </View>

      <View style={styles.favoritePokemonContainer}>
        <Text style={styles.favoritePokemonText}>Favorite Pokémon:</Text>
        <Text style={styles.pokemonNameText}>Pikachu</Text>
        <Image source={require('../assets/pikachuPng.png')} style={styles.pokemonImage} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#f5f5f5', // Light background color
  },
  imageContainer: {
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: height * 0.02,
  },
  userInfoContainer: {
    backgroundColor: '#fff', // White background for user info
    borderRadius: 10,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    marginBottom: height * 0.02,
    alignItems: 'center',
    width: '100%', // Full width
  },
  nameText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: width * 0.045,
    color: '#666',
  },
  phoneText: {
    fontSize: width * 0.045,
    color: '#666',
  },
  ageText: {
    fontSize: width * 0.045,
    color: '#666',
  },
  genderText: {
    fontSize: width * 0.045,
    color: '#666',
  },
  countryText: {
    fontSize: width * 0.045,
    color: '#666',
  },
  pokemonCountText: {
    fontSize: width * 0.045,
    color: '#4CAF50',
    marginTop: height * 0.01,
  },
  favoritePokemonContainer: {
    marginTop: height * 0.02,
    alignItems: 'center',
    backgroundColor: '#fff', // White background for favorite Pokémon
    borderRadius: 10,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    width: '100%', // Full width
  },
  favoritePokemonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
  },
  pokemonNameText: {
    fontSize: width * 0.04,
    color: '#666',
    marginTop: height * 0.005,
  },
  pokemonImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    marginTop: height * 0.01,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});
