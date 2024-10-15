import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'POKEMON_DATA';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonList: [],
    loading: false,  // Loading state
    error: null,     // Error state
  },
  reducers: {
    setPokemonList(state, action) {
      state.pokemonList = action.payload;
      state.loading = false; // Set loading to false after loading data
    },
    addPokemon(state, action) {
    
        const existingIds = state.pokemonList.map(pokemon => parseInt(pokemon.id, 10));
        const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1; // Generate new ID
        const newPokemon = { id: String(newId).padStart(3, '0'), ...action.payload };
        state.pokemonList.push(newPokemon);
       
      }
    ,
    deletePokemon(state, action) {
        state.pokemonList = state.pokemonList.filter(pokemon => pokemon.id !== action.payload);
      },
    clearPokemonList(state) {
      state.pokemonList = [];
    },
    setLoading(state) {
      state.loading = true; // Set loading to true when starting to load data
    },
    setError(state, action) {
      state.error = action.payload; // Handle errors
      state.loading = false; // Stop loading on error
    },
  },
});

// Async functions
export const loadPokemonData = () => async (dispatch) => {
  dispatch(setLoading()); // Start loading
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : [];
    dispatch(setPokemonList(data));
  } catch (e) {
   
   
  }
};

export const savePokemonData = (pokemonList) => async () => {
  try {
    const jsonValue = JSON.stringify(pokemonList);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save Pokémon data to AsyncStorage:', e);
  }
 
};

// Thunk to add Pokémon and save to AsyncStorage
export const addPokemonAndSave = (pokemon) => async (dispatch, getState) => {
  dispatch(addPokemon(pokemon)); // Update state with new Pokémon
  const { pokemonList } = getState().pokemon; // Get the updated Pokémon list
  await dispatch(savePokemonData(pokemonList)); // Save updated list to AsyncStorage
};
export const deletePokemonAndSave = (pokemonId) => async (dispatch, getState) => {
    dispatch(deletePokemon(pokemonId)); // Remove Pokémon from state
    const { pokemonList } = getState().pokemon; // Get updated list
    await dispatch(savePokemonData(pokemonList)); // Save updated list to AsyncStorage
  };

export const { setPokemonList, addPokemon, clearPokemonList, setLoading, setError, deletePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
