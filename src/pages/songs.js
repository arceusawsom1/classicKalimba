import { useState, useEffect } from "react";
import SongSearchResult from "../components/songSearchResult";
import { BASE_URL } from "../data/connection";
import CircularProgress from '@mui/material/CircularProgress';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
  
    let endpoint = BASE_URL + "/songs/search"
    console.log("Endpoint: " + endpoint)

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => updateSongList(data));
  },[])

  const updateSongList = (data) => {
    let songs=[];
    for (let a in data){
      let song = data[a]
      songs.push(song);
    }
    setSongs(songs)
  }

  let songList=[];
  for (let a=0; a<songs.length; a++){
    let song=songs[a];
    songList.push(
      <>
      <SongSearchResult song={song} key={a}/>
      </>
    )
  }
  return(
    <div>
      <h1>Songs Page</h1>
      {songList.length>0 && songList}
      {songList.length>0 || <CircularProgress size={"200px"} sx={{margin:"auto"}} />}
    </div>
  )
}
export default Songs;