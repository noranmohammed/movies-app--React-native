import React, { useContext, useState } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import { FavoritesContext } from '../contexts/FavouritesContextPorvider';
import MovieCard from '../components/MovieCard';
import { Button, MD2Colors } from 'react-native-paper';

const Favourites = () => {
  const {favoriteMovies,removeallFromFireBase}=useContext(FavoritesContext)
    return (
        <View style={styles.cont}>
             <FlatList data={favoriteMovies}
            renderItem={({item})=><MovieCard key={item.id} movie={item}></MovieCard>}
            keyExtractor={(item) => item.id.toString()}
             contentContainerStyle={{ paddingBottom: 80 }} 
            >
             
           </FlatList>
            <Button mode="contained" buttonColor='red' style={{margin:10}} onPress={removeallFromFireBase}>Delete all</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    cont:{
        backgroundColor:"#0a0a0af9",
        flex:1
    }
})

export default Favourites;
