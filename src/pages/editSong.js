import Kalimba from "../components/Kalimba.js";
import EditSongMetadata from "../components/EditSongMetadata.js";
import {useEffect, useState} from "react";
import TineSets from "../data/tineSets.js";
import { CircularProgress, Divider } from '@mui/material';
import {useLocation} from "react-router-dom";
import { BASE_URL } from "../data/connection";
import tineSets from "../data/tineSets";



const EditSong = () => {
  const [song, setSong] = useState(null);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  useEffect(()=>{
    //If there is an ID in the URL, then pull it from the API
    if (id){
      console.log("ID: " + id)
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
    
      let endpoint = BASE_URL + "/songs/findbyid?id=" + id
      console.log("Endpoint: " + endpoint)
  
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => loadSong(data));
    } else {
      let prevSong = JSON.parse(localStorage.getItem("songcache"))
      console.log(prevSong)
      if (prevSong){
        setSong(
          {
            ...prevSong,
            tines: TineSets[prevSong.tineSet],
          }
        )
      } else {
        newSong();
      }
    }
    
    
   
  },[])

  const loadSong = (data) => {
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
  }

  const newSong = () => {
    let mapping = [];
    for (let i=0; i<17; i++){ //there are 17 tines
      mapping.push([])
    }
    let durationMapping = [];
    durationMapping[9] = 0;
    durationMapping.fill(1);
    mapping.push(durationMapping);
    setSong({
      title:"Enter Title Here",
      desc:"Enter Description Here",
      rating: 0,
      favourites: 0,
      bpm: 90,
      tineSet:0,
      tines:[
        ...TineSets[0]
      ],
      mapping:[
        ...mapping
      ],
    })
  }
  useEffect(()=>{

  },[song])

  let songDetails = <CircularProgress />
  let kalimba = <CircularProgress />
  if (song){
    songDetails=(
      <div className="songDetails">
        <EditSongMetadata song = {[song,setSong]}/>
      </div>
    )
    kalimba = (
      <Kalimba song={[song, setSong]} editable/>
    )
  }
  
  return(
    <div className="editSongDiv">
      {songDetails}
      {kalimba}
    </div>
  );
}
export default EditSong;