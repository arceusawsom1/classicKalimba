import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import SongSearchResult from "../components/songSearchResult";
import { BASE_URL } from "../data/connection";
import CircularProgress from '@mui/material/CircularProgress';
const UserView = (props) =>{
  const [songs, setSongs] = useState([]);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
  
    let endpoint = BASE_URL + "/songs/findbyuserid?id=" + id
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
    console.log("song")
    console.log(song);
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
export default UserView;