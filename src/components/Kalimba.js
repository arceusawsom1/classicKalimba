import { useEffect, useState, useRef } from "react";
import KalimbaControlBar from "./KalimbaControlBar";
import KalimbaView from "./KalimbaView";
import play, { setHowlerVolume } from "./notePlayer.js";
const Kalimba = (props) => {
  const [song, setSong] = props.song;
  const [volume, setVolume] = useState(100);
  const [songPlaying, setSongPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(undefined);
  const [playInstances, setPlayInstances] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const tinesRef = useRef();
  let [bpmSpeed, setBpmSpeed] = useState(1);

  useEffect(()=>{
    setHowlerVolume(volume);
  },[])

  useEffect(()=>{
    setHowlerVolume(volume);
  },[volume])

  const playSong = async(startIndex) => {
    console.log("starting a new instance of song: " + startIndex);
    setSongPlaying(true);
    let abortController = new AbortController();
    setPlayInstances([...playInstances, abortController])
    try {
      await startSong(abortController.signal, startIndex);
    } catch {
      console.log("Song stopped early")
    } finally {
      setCurrentStep(null);
      setSongPlaying(false);
    }
  }
  const stopSong = () =>{
    abortPlays();
  }
  //The method that aborts all play instances
  const abortPlays = (abortSignal) => {
    for (let a in playInstances){
      let controller = playInstances[a];
      controller.abort();
    }
    setPlayInstances([])
  }
  useEffect(()=>{
    scrollToIndex(startFrom);
  },[startFrom])
  const decrementScroll = (x)=>{
    tinesRef.current.scrollTop -= x;
  }
  const scrollToBottom = () => {
    tinesRef.current.scrollTop += 100000;
  }
  const scrollToIndex = (index) => {
    tinesRef.current.scrollTop += 100000;
    for (let a=0; a<index;a++){
      decrementScroll(21);
    }
  }
  const startSong = async(abortSignal, startIndex) =>{
    let map = song.mapping;
    scrollToBottom();
    let delay= 60000/(bpmSpeed * song.bpm)
    let timings = map[map.length-1] //the final array in this array is a collection of timings
    if (map.length>0){
      for  (let i=startIndex; i<map[map.length-1].length; i++){
        setCurrentStep(i);
        if (abortSignal.aborted){
          return;
        }
        let notesThisTimestep=[];
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
        scrollToIndex(i);
        await new Promise(r => setTimeout(r, delay*timings[i]));
      }
    } else {
      console.log("Mapping is null or empty");
    }
    setCurrentStep(undefined);
    setSongPlaying(false);
  }
  const playNote = async(note) => {
    play(note);
  }
  const setRhythm = (index, newRhythm, newDuration) => {
    if (index=="duration"){
      console.log("duration key was used with rhythm")
      index = song.mapping.length-1;
    }
    let tempMapping = song.mapping;
    tempMapping[index] = newRhythm;
    tempMapping[tempMapping.length-1] = newDuration
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
    <div className="kalimba">
      <h1 className={"hideOnDesktop"}>Song</h1>
      <KalimbaControlBar bpm={song.bpm*bpmSpeed} bpmSpeed={[bpmSpeed, setBpmSpeed]} song={[song, setSong]}
        songPlaying = {[songPlaying, setSongPlaying]} playSong={playSong} stopSong={stopSong} volume = {[volume, setVolume]}
        startFrom={[startFrom, setStartFrom]}/>
      <KalimbaView tines = {song.tines} rhythm = {[rhythm, setRhythm]} playNote={playNote}
        duration={[duration, setDuration]} currentStep = {currentStep} tinesRef = {tinesRef}
        startFrom = {[startFrom, setStartFrom]} editable={props.editable}/>
      {!songPlaying && <button onClick={()=>{playSong(startFrom)}}>Play From</button> }
    </div>
  )
}
export default Kalimba;