import { useEffect, useState } from "react";
import KalimbaControlBar from "./KalimbaControlBar";
import KalimbaView from "./KalimbaView";
import play, { setHowlerVolume } from "./notePlayer.js";
const Kalimba = (props) => {
  const [song, setSong] = props.song;
  const [volume, setVolume] = useState(10);
  const [songPlaying, setSongPlaying] = useState(false);
  let [bpmSpeed, setBpmSpeed] = useState(1);

  useEffect(()=>{
    setHowlerVolume(volume);
  },[])

  useEffect(()=>{
    setHowlerVolume(volume);
  },[volume])
  
  const stopSong = () =>{
    setSongPlaying(false);
  }
  useEffect(()=>{
    if (songPlaying){
      playSong();
    }
  },[songPlaying])

  const playSong = async() =>{
    let map = song.mapping;
    let delay= 60000/(bpmSpeed * song.bpm)
    let timings = map[map.length-1] //the final array in this array is a collection of timings
    if (map.length>0){
      console.log(map)
      for  (let i=0; i<map[map.length-1].length; i++){
        if (!songPlaying){
          return;
        }
        let notesThisTimestep=[];
        console.log(map)
        for (let j=0; j<map.length-1;j++){
          if (map[j][i]){
            if (j<song.tines.length-1){
              let sound = song.tines[j]
              notesThisTimestep.push(sound.note + (sound.accidental || "") + sound.octave)
            } else{
              console.log("Note is outside of kalimba's range")
            }
          }
        }
        play(notesThisTimestep)
        await new Promise(r => setTimeout(r, delay*timings[i]));
      }
    } else {
      console.log("Mapping is null or empty");
    } 
  }
  const playNote = async(note) => {
    play(note);
  }
  const setRhythm = (index, newRhythm) => {
    let tempMapping = song.mapping;
    tempMapping[index] = newRhythm;
    setSong({
      ...song,
      mapping:[
        ...tempMapping,
      ]
    })
  }
  const rhythm = (index) => {
    return song.mapping[index];
  }
  const duration = song.mapping[song.mapping.length-1];
  const setDuration = (index, newVal) => {
    console.log("Setting duration of: " + index)
    let newD = [...duration];
    newD[index]=newVal;
    setRhythm(song.mapping.length-1,newD);
  }
  return(
    <>
      <KalimbaControlBar bpm={song.bpm*bpmSpeed} bpmSpeed={[bpmSpeed, setBpmSpeed]} song={[song, setSong]}
        songPlaying = {[songPlaying, setSongPlaying]} stopSong={stopSong} volume = {[volume, setVolume]}/>
      <KalimbaView tines = {song.tines} rhythm = {[rhythm, setRhythm]} playNote={playNote}
        duration={[duration, setDuration]}/>
    </>
  )
}
export default Kalimba;