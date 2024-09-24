import React, { createContext, useEffect, useReducer, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MoviesReducer from '../reducers/moviesReducer';
import axios from 'axios';
export const moviesContext=createContext()
const MoviesContextPorvider = ({children}) => {
    const [allmovies,dispatch]=useReducer(MoviesReducer,[])
    const [loading,setIsLoading]=useState(true)
    const [puplermovies,setpupler]=useState([])
    const [Upcomingmovies,setupcoming]=useState([])
    const [playingmovies,setplaying]=useState([])


    const [error,setErr]=useState("")
    useEffect(()=>{
     async function fetchallmovies() {
        try{
            const res=await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=f3816373840e2d4cdb6a2d37e19d9147")
      
            dispatch({type:"GETALLMOVIES",payload:res.data.results})
            setIsLoading(false)  
        }catch(error){
            setErr(error.message)
        }        
     }
     async function fetchPoplurmovies() {
        try{
             await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=f3816373840e2d4cdb6a2d37e19d9147")
            .then((res)=>setpupler(res.data.results))
        }catch(error){
            setErr(error.message)
        }        
     }
     async function fetchUpcomingmovies() {
        try{
              await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=f3816373840e2d4cdb6a2d37e19d9147")
            .then((res)=>setupcoming(res.data.results))
        }catch(error){
            setErr(error.message)
        }        
     }
     async function fetchPlayingmovies() {
        try{
              await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=f3816373840e2d4cdb6a2d37e19d9147")
            .then((res)=>setplaying(res.data.results))
        }catch(error){
            setErr(error.message)
        }        
     }
   
     fetchallmovies()
     fetchPoplurmovies()
     fetchUpcomingmovies()
     fetchPlayingmovies()
    },[])
    return(
        <moviesContext.Provider value={{allmovies,loading,error,dispatch,puplermovies,Upcomingmovies,playingmovies}}>
             {children}
        </moviesContext.Provider>
    );
   
}

const styles = StyleSheet.create({})

export default MoviesContextPorvider;
