import Kalimba from "../components/Kalimba.js";
import EditSongMetadata from "../components/EditSongMetadata.js";
import {useEffect, useState} from "react";
const EditSong = () => {
  const [song, setSong] = useState(null);
  useEffect(()=>{
    setSong({
      title:"Zombie",
      desc:"Some sort of description idk man",
      rating: 4.5,
      favourites: 4392,
      bpm: 90,
      tines:[
        {
          position: 1,
          note: "c",
          octave: 4,
          accidental: null,
          painted:true,
        },
        {
          position: 2,
          note: "d",
          octave: 4,
          accidental: null,
          painted:false,
        },
        {
          position: 3,
          note: "e",
          octave: 4,
          accidental: null,
          painted:false,
        },
        {
          position: 4,
          note: "f",
          octave: 4,
          painted:false,
        },
        {
          position: 5,
          note: "g",
          octave: 4,
          accidental: null,
          painted:false,
        },
        {
          position: 6,
          note: "a",
          octave: 4,
          accidental: null,
          painted:true,
        },
        {
          position: 7,
          note: "b",
          octave: 4,
          accidental: null,
          painted:true,
        },
        {
          position: 1,
          note: "c",
          octave: 5,
          accidental: null,
          painted:false,
        },
        {
          position: 2,
          note: "d",
          octave: 5,
          accidental: null,
          painted:false,
        },
        {
          position: 3,
          note: "e",
          octave: 5,
          accidental: null,
          painted:false,
        },
        {
          position: 4,
          note: "f",
          octave: 5,
          painted:false,
        },
        {
          position: 5,
          note: "g",
          octave: 5,
          accidental: null,
          painted:true,
        },
        {
          position: 6,
          note: "a",
          octave: 5,
          accidental: null,
          painted:true,
        },
        {
          position: 7,
          note: "b",
          octave: 5,
          accidental: null,
          painted:false,
        },
        {
          position: 1,
          note: "c",
          octave: 6,
          accidental: null,
          painted:false,
        },
        {
          position: 2,
          note: "d",
          octave: 6,
          accidental: null,
          painted:false,
        },
        {
          position: 3,
          note: "e",
          octave: 6,
          accidental: null,
          painted:false,
        },
      ],
      mapping:[
        [1,0,0,0,0,0,0,0,0,0,0,0,0], //C4
        [0,0,0,1,0,0,0,0,0], //D4
        [0,1,0,0,0,0,1,0], //E4
        [0,0,0,0,1,0,0,0,0,1], //F4
        [0,0,1,0,0,0,0,1], //G4
        [0,0,0,0,0,1,0,0,0,0,1], //A4
        [0,0,1,0,0,0,0,0,1], //B4
        [0,0,0,0,0,1,0,0], //C5
        [0,0,0,0,0,0,0,0,1,0,0,1], //D5
        [0,0,0,0,0,0,0,0], //E5
        [0,0,0,0,0,0,0,0,0,0,0,1], //F5
        [0,0,0,0,0,0,0,0], //G5
        [0,0,0,0,0,0,0,0], //A5
        [0,0,0,0,0,0,0,0], //B5
        [0,0,0,0,0,0,0,0], //C6
        [0,0,0,0,0,0,0,0], //D6
        [0,0,0,0,0,0,0,0], //E6
        [1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1], //TIMINGS
      ],
    })
  },[])
  useEffect(()=>{
    console.log("new song")
    console.log(song)
  },[song])
  const mapping = () => {
    return song.mapping;
  }
  const setMapping =(newMapping) => {
    let newSong = {...song}
    newSong.mapping=newMapping;
    console.log(newSong);
    setSong(newSong)
  }
  

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