import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import MoviesContextPorvider from './contexts/moviesContextPorvider';
import { FavoritesProvider } from './contexts/FavouritesContextPorvider';

export default function App() {
  return (

      <MoviesContextPorvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Root></Root>
          </NavigationContainer>
        </FavoritesProvider>
      </MoviesContextPorvider>
      
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
