// Define action types
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const SET_FAVORITES = 'SET_FAVORITES';


const initialState = [];

function favoritesReducer(state, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      if (state.some(movie => movie.id === action.payload.id)) {
        return state; 
      }
      return [...state, action.payload]; 

    case REMOVE_FAVORITE:
      
      return state.filter(movie => movie.id !== action.payload);

    case SET_FAVORITES:
      return action.payload;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export { favoritesReducer, ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES };
