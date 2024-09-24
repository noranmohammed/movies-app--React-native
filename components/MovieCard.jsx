import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, IconButton, Text } from 'react-native-paper';
import { FavoritesContext } from '../contexts/FavouritesContextPorvider';


const postersmall="https://image.tmdb.org/t/p/original"
const backdropsmall="https://image.tmdb.org/t/p/w300"
const MovieCard = ({movie}) => {
  const [IsClicked,setIsClicked]=useState(false)
  const [Iconcolorr,setIconcolorr]=useState("white")  
  const {favoriteMovies, addFavorite, removeFavorite}=useContext(FavoritesContext)
  const handleFav=()=>{
    setIsClicked(!IsClicked)
    if(IsClicked){
      addFavorite(movie)
      setIconcolorr("red")
    }else{
      removeFavorite(movie.id)
      setIconcolorr("white")
     
    }

  }
  return (
   <Card style={styles.card}>
    <Card.Cover source={{ uri: `${postersmall}${movie.backdrop_path}` }}/>    
    <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
     <Text variant='titleMedium' style={{marginTop:15,color:"white",fontWeight:"bold"}}>{movie.title}</Text>
     <IconButton  icon="cards-heart" iconColor={Iconcolorr} size={30} onPress={handleFav} />
    </Card.Content>
   </Card>
  );
}

const styles = StyleSheet.create({
  card:{
    margin:20,
    backgroundColor:"#4a4545"
  }
})

export default MovieCard;
