import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import SongSearchResult from "../components/songSearchResult";
import { BASE_URL } from "../data/connection";
import CircularProgress from '@mui/material/CircularProgress';
import Kalimba from "../components/Kalimba.js";
import tineSets from "../data/tineSets";



const SongPlay = (props) => {
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
  
    let endpoint = BASE_URL + "/songs/findbyid?id=" + id
    console.log("Endpoint: " + endpoint)

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => updateSong(data));
  },[])

  const updateSong = (data) => {
    if ("error" in data){
      console.log("error in response:")
      console.log(data)
      return;
    }
    console.log(data);
    setSong(
      {
        ...data,
        tines: tineSets[data.tineSet],
      }
    )
    setLoading(false);
  }
  return(
    <div className = "SongPlay">
      {loading && <CircularProgress />}
      {!loading && <Kalimba song={[song, setSong]}/>}
    </div>
    
  )
}
export default SongPlay;