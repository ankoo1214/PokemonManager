import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
  },
  reducers: {
    addPokemon: (state, action) => {
      state.list.push(action.payload);
    },
    removePokemon: (state, action) => {
      state.list = state.list.filter(pokemon => pokemon.id !== action.payload);
    },
    editPokemon: (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addPokemon, removePokemon, editPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
