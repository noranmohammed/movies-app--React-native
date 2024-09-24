import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Text,
  MD2Colors,
  Searchbar,
  Menu,
  Divider,
  PaperProvider,
  Button,
  IconButton,
} from "react-native-paper";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { moviesContext } from "../contexts/moviesContextPorvider";
import { useFocusEffect } from "@react-navigation/native";
import { FavoritesContext } from '../contexts/FavouritesContextPorvider';

const Home = () => {
  const { allmovies, loading, error, dispatch,puplermovies,Upcomingmovies,playingmovies } = useContext(moviesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [flitermovies, setfiltermovies] = useState(allmovies);
  const [visible, setVisible] = React.useState(false);
  const {favoriteMovies}=useContext(FavoritesContext)

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  
  useEffect(()=>{
    setfiltermovies(allmovies)
  },[])
  const handlesearch = (val) => {
    setfiltermovies(allmovies)
    setSearchQuery(val);
    if (val) {
        
      const filtered = allmovies.filter((m) =>
        m.title.toLowerCase().includes(val.toLowerCase())
      );
      setfiltermovies(filtered);
    } else {
      setfiltermovies(allmovies); // Reset to original list when search query is empty
    }
  };
//   useFocusEffect(useCallback(()=>{
//     setfiltermovies(allmovies)
//   },[favoriteMovies]))
  if (loading)
    return (
      <ActivityIndicator
        animating={true}
        style={{ marginVertical: 50 }}
        color={MD2Colors.amber100}
        size="large"
      ></ActivityIndicator>
    );
  return (
    <PaperProvider>
    <View style={styles.cont}>
      <View style={{ flexDirection: "row" }}>
        <Searchbar
          placeholder="Search"
          onChangeText={handlesearch}
          value={searchQuery}
          style={{ marginVertical: 10,width:280 }}
        />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon={"filter"}
                  iconColor="white"
                  onPress={openMenu}
                  size={40}
                >
                </IconButton>
              }
            >
              <Menu.Item onPress={() => {setfiltermovies(puplermovies)}} title="Top movies" />
              <Divider />
              <Menu.Item onPress={() => {setfiltermovies(Upcomingmovies)}} title="Upcoming" />
              <Divider />
              <Menu.Item onPress={() => {setfiltermovies(playingmovies)}} title="now playing" />
            </Menu>
          </View>
       
      </View>

      <FlatList
        data={flitermovies}
        renderItem={({ item }) => (
          <MovieCard key={item.id} movie={item}></MovieCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      ></FlatList>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "#0a0a0af9",
    flex: 1,
  },
});

export default Home;
