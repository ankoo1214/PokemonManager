import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deletePokemonAndSave } from '../redux/pokemonSlice';
const { width, height } = Dimensions.get('window');
import { Alert } from 'react-native';
const DetailScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
  const route = useRoute();
  const { pokemon } = route.params;
  const handleEdit = () => {
    navigation.navigate('EditData', {  pokemon: {
        id: pokemon.id,
        type:pokemon.type,
        serial:pokemon.serial,
        name: pokemon.name,
        weakness: pokemon.weakness,
        strength: pokemon.strength,
        breed: pokemon.breed,
        height: pokemon.height,
        gender: pokemon.gender,
        weight: pokemon.weight,
        description: pokemon.description,
        image: pokemon.image, // image passing
      }, }); 
  };
//   delete  pokemon -----
  const handleDelete = () => {
    Alert.alert(
      'Delete Confirmation', 
      'Are you sure you want to delete this Pokémon?', 
      [
        {
          text: 'Cancel', 
          onPress: () => console.log('Deletion cancelled'), 
          style: 'cancel', 
        },
        {
          text: 'Delete', 
          onPress: () => {
            dispatch(deletePokemonAndSave(pokemon.id)); 
            navigation.goBack(); 
          },
          style: 'destructive', 
        },
      ],
      { cancelable: true } 
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pokemonInfo}>
        <View style={styles.idContainer}>
          <Text style={styles.pokemonNumber}>#{pokemon.serial}</Text>
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
            <Text style={styles.statLabel}>Type</Text>
            <Text style={styles.statValue}>{pokemon.type}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{pokemon.height} ft</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Breed</Text>
            <Text style={styles.statValue}>{pokemon.breed}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{pokemon.weight} lbs</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Gender</Text>
            <Text style={styles.genderSign}>♂ ♀</Text>
          </View>
        
        </View>
        <View style={styles.weaknesAbilityContainer}>
          <View style={styles.weaknessContainer}>
            <Text style={styles.weaknessLabel}>Weakness</Text>
            <Text style={styles.weakness}>{pokemon.weakness}</Text>
          </View>
          <View style={styles.abilityContainer}>
            <Text style={styles.abilityLabel}>Abilities</Text>
            <Text style={styles.ability}>{pokemon.strength}</Text>
          </View>
          <View  style={styles.descriptionContainer}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descriptionText
            }>{pokemon.description}</Text>
          </View>
        </View>
     
        <Image style={styles.bottomImage} source={require('../assets/ash1.webp')}/>
      
      </View>
      
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6cabc',
    padding: width * 0.04,
    justifyContent:'center'
  },
  pokemonInfo: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,

  },
  pokemonNumber: {
    fontSize: width * 0.05,
    color: '#E9724C',
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color:'#505050'

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
    marginVertical: height * 0.0,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.01,
  },
  statLabel: {
    fontSize: width * 0.04,
    color: '#333333',
  },
  statValue: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  genderSign:{
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  weaknesAbilityContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    
  },
  weaknessContainer: {
    marginBottom: height * 0.01,
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
    color: '#008000',
  },
  ability: {
    fontSize: width * 0.04,
    color: '#333333',
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
    marginBottom: height * 0.015,
    borderRadius: 20,
    paddingVertical: '1%',
  },
  idContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.015,
  },
  description: {
    color: '#676767',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  descriptionContainer:{
    width:width*0.5
  },
  bottomImage: {
    width: width * 0.50, 
    height: height * 0.35, 
    position: 'absolute',
    resizeMode: 'contain',
    bottom: height *-0.015, 
    right: width * 0.01, 
    opacity: 0.9,
    zIndex: -5,
  },
  descriptionText:{
    color:'#333333'
  }
});

export default DetailScreen;
