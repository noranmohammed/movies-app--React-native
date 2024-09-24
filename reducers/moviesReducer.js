import React from 'react';
import { StyleSheet, View } from 'react-native';

const MoviesReducer = (state,action) => {
  if(action.type==="GETALLMOVIES"){
    return action.payload
  }   
  return state
}

const styles = StyleSheet.create({})

export default MoviesReducer;
