import React, { createContext, useContext,useState, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritesReducer, ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES } from '../reducers/favouriteReducer';
import { db } from '../firebaseConfig'; 
import { doc, setDoc,deleteDoc } from "firebase/firestore";
import { forEach } from 'react-native-axios/lib/utils';

export const FavoritesContext = createContext();


const initialState = [];

export function FavoritesProvider({ children }) {
  const [favoriteMovies, dispatch] = useReducer(favoritesReducer, initialState);
  const [Iconcolor,setIconcolor]=useState("white")  


  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favoriteMovies');
        if (storedFavorites) {
          dispatch({ type: SET_FAVORITES, payload: JSON.parse(storedFavorites) });
        }
      } catch (error) {
        console.error('Failed to load favorite movies from AsyncStorage', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      } catch (error) {
        console.error('Failed to save favorite movies to AsyncStorage', error);
      }
    };
    saveFavorites();
  }, [favoriteMovies]);

  const addFavorite = (movie) => {
    dispatch({ type: ADD_FAVORITE, payload: movie });
    setIconcolor("red")
    addFavoriteToFirestore(movie)
  };
  // * add to firebase store
  const addFavoriteToFirestore = async (movie) => {
    try {
      const movieRef = doc(db, "favorites", movie.id.toString());
      await setDoc(movieRef, movie);
    } catch (error) {
      console.error("Error adding favorite movie to Firestore:", error);
    }
  };

  const removeFavorite = (movieId) => {
    dispatch({ type: REMOVE_FAVORITE, payload: movieId });
    setIconcolor("white");
    removeFromFireBase(movieId);
  };
  const removeFromFireBase=async (movieId)=>{
    await deleteDoc(doc(db, "favorites", movieId.toString()));
    
  };
  const removeallFromFireBase=async ()=>{
    favoriteMovies.forEach((movie)=>removeFavorite(movie.id))
  };


  return (
    <FavoritesContext.Provider value={{ favoriteMovies, addFavorite, removeFavorite,Iconcolor,removeallFromFireBase }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to use the favorites context

