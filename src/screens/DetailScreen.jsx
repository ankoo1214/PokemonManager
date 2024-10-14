import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const DetailScreen = () => {
  const route = useRoute();
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.pokemonInfo}>
        <View style={styles.idContainer}>
        <Text style={styles.pokemonNumber}>#{pokemon.id}</Text>
        <Text style={styles.pokemonName}>{pokemon.name}</Text></View>
<View style={styles.imageContainer}>  
    <Image
          style={styles.pokemonImage}
          source={pokemon.image}
        /></View>
       
      
      <View style = {styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
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
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Gender</Text>
            <Text style={styles.statValue}>♂ / ♀</Text>
          </View>
        </View>
<View style={styles.weaknesAbilityContainer}>
<View style={styles.weaknessContainer}>
          <Text style={styles.weaknessLabel}>Weakness</Text>
          <Text style={styles.weakness}>{pokemon.weakness.join(' ,')}</Text>
        </View>

        <View style={styles.abilityContainer}>
          <Text style={styles.abilityLabel}>Abilities</Text>
          <Text style={styles.ability}>{pokemon.strength.join(' ,')}</Text>
        </View>
        <View>
            <Text style={styles.description}>Description</Text>
            <Text>{pokemon.description}</Text>
        </View>
</View>
        

        {/* <View style={styles.footer}>
          <Image
            style={styles.ashImage}
            source={require('../assets/pikachubottom.png')} 
          />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFD6F7',
    backgroundColor:'#E9724C',
    paddingHorizontal: width * 0.04,
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
    marginVertical: height * 0.02,
  },
  pokemonNumber: {
    fontSize: width * 0.05,
    color: '#FF4500',
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginVertical: height * 0.01,
  },
  pokemonImage: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: height * 0.02,
    resizeMode: 'contain'
  },
  deleteButton: {
    backgroundColor:'#ff5733',
  width:width*0.4,
  paddingVertical:'3%',
   borderRadius:'20%',
   borderRadius:10,
   elevation:5
  },
  editButton: {
    backgroundColor:'#0096FF',
    width:width*0.4,
      paddingVertical:'3%',
      borderRadius:10,
      elevation:5
},
  editText: {
   color:'#ffffff',
   textAlign:'center',
   fontSize:width*0.04,
   fontWeight:'bold'
  },
  deleteText: {
    color:'#ffffff',
    textAlign:'center',
    fontSize:width*0.04,
    fontWeight:'bold'
  },
  statsContainer: {
    marginVertical: height * 0.02,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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
  weaknesAbilityContainer:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    width:'100%',
    paddingHorizontal:width*0.02
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
  footer: {
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  ashImage: {
    resizeMode:'contain',
    width:'20%'
  },
  buttonContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  imageContainer:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#0D63BF',
    marginVertical:height*0.01,
    borderRadius:20,
    paddingVertical:'1%'
  },
  idContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'
  },
  description:{
    color:'#676767',
    fontSize:width*0.04,
    fontWeight:'bold'
  }

});

export default DetailScreen;
