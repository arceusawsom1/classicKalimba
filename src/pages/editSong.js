import Kalimba from "../components/Kalimba.js";
import EditSongMetadata from "../components/EditSongMetadata.js";
import {useEffect, useState} from "react";
import TineSets from "../data/tineSets.js";
import { Divider } from '@mui/material';

const EditSong = () => {
  const [song, setSong] = useState(null);
  useEffect(()=>{
    newSong();
   
  },[])

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

  let songDetails = <p>Loading</p>;
  let kalimba = <p>Loading</p>;
  if (song){
    songDetails=(
      <div className="songDetails">
        <EditSongMetadata song = {[song,setSong]}/>
      </div>
    )
    kalimba = (
      <div className="kalimba">
        <Kalimba song={[song, setSong]}/>
      </div>
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