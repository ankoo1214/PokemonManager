import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
const DetailScreen= () => {
    const route = useRoute();
    const { pokemon } = route.params;
  return (
    <View style={styles.container}>
      {/* Header */}
   
      
   
      
      {/* Charizard Info Section */}
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonNumber}>#{pokemon.id}</Text>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        
        <Image
          style={styles.pokemonImage}
          source={pokemon.image} // Placeholder
        />
        
        <View style={styles.typesContainer}>
          <Text style={styles.fireType}>Fuego</Text>
          <Text style={styles.flyType}>Volador</Text>
        </View>
        
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Altura</Text>
            <Text style={styles.statValue}>1.7 m</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Categoría</Text>
            <Text style={styles.statValue}>Llama</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Peso</Text>
            <Text style={styles.statValue}>90.5 kg</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Sexo</Text>
            <Text style={styles.statValue}>♂ / ♀</Text>
          </View>
        </View>
        
        {/* Weakness Section */}
        <View style={styles.weaknessContainer}>
          <Text style={styles.weaknessLabel}>Debilidad</Text>
          <Text style={styles.weakness}>Agua, Electricidad, Roca</Text>
        </View>
        
        {/* Abilities Section */}
        <View style={styles.abilityContainer}>
          <Text style={styles.abilityLabel}>Habilidades</Text>
          <Text style={styles.ability}>Mar Llamas</Text>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Image
            style={styles.ashImage}
            source={{ uri: 'https://example.com/ash.png' }} // Placeholder
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFD6F7',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  searchContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  searchInput: {
    width: '80%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    fontSize: 16,
  },
  pokemonInfo: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  pokemonNumber: {
    fontSize: 18,
    color: '#FF4500',
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  fireType: {
    backgroundColor: '#FFA500',
    color: '#FFFFFF',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  flyType: {
    backgroundColor: '#87CEEB',
    color: '#FFFFFF',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statsContainer: {
    marginVertical: 20,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weaknessContainer: {
    marginBottom: 20,
  },
  weaknessLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  weakness: {
    fontSize: 16,
    color: '#333',
  },
  abilityContainer: {
    marginBottom: 20,
  },
  abilityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  ability: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  ashImage: {
    width: 100,
    height: 100,
  },
});

export default DetailScreen;