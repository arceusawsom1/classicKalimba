import SongSearchResult from "../components/songSearchResult";
import { useState, useEffect } from "react";
import { BASE_URL } from "../data/connection";
import CircularProgress from '@mui/material/CircularProgress';

const MySongs = () => {
  const [songs, setSongs] = useState([]);
  
  useEffect(()=>{
    requestSongRefresh();
  },[])
  
  const requestSongRefresh = () =>{
    let bearer = localStorage.getItem("bearer")
    if (bearer){
      const requestOptions = {
        method: 'GET',
        headers: 
        { 
          'Content-Type': 'application/json',
          'authorization': bearer
        },
      };
    
      let endpoint = BASE_URL + "/songs/mysongs"
      console.log("Endpoint: " + endpoint)

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => updateSongList(data));
    }
  }

  const updateSongList = (data) => {
    let songs=[];
    
    for (let a in data){
      if (data[a] instanceof Object){
        let song = data[a]
        songs.push(song);
      }
    }
    setSongs(songs)
  }

  let songList=[];
  for (let a=0; a<songs.length; a++){
    let song=songs[a];
    songList.push(
      <>
      <SongSearchResult song={song} key={a} longView refreshCallback={requestSongRefresh}/>
      </>
    )
  }
  

  console.log(songList.length)
  return(
    <div style={{textAlign:"center"}}>
      <div className = "SongsContainer">
        <h1>My Songs</h1>
        {songList.length>0 && songList}
        {songList.length>0 || <CircularProgress size={"200px"} sx={{margin:"auto"}} />}
      </div>
    </div>
  )
}
export default MySongs;