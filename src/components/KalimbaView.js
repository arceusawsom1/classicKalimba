import Tine from "./Tine.js";
import {useState} from "react";

//The Component that holds The Kalimba itself. Should support scrolling through all the tinesteps
const KalimbaView = (props) => {
  const tines = props.tines;
  const [duration, setDuration] = props.duration;
  const [rhythm, setRhythm] = props.rhythm;
  const [shiftHeld, setShiftHeld] = useState(false)
  const [startFrom, setStartFrom] = props.startFrom;
  const tinesRef=props.tinesRef;
  let tinesList = []
  const handleKeyDown = (data) =>{
    if (data.key=="Shift"){
      setShiftHeld(true)
    }
  }
  const handleKeyUp = (data) =>{
    if (data.key=="Shift"){
      setShiftHeld(false)
    }
  }
  //Only need these props for people editing the song
  if (props.editable){
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }
  
  for (let i=0; i<tines.length; i++){
    let inverseIndex= tines.length-i
    let style = {
      paddingBottom:inverseIndex*10
    }
    let tine = <Tine id = {i} key={i} style={style} note = {tines[i]} playNote={props.playNote}
      rhythm ={props.rhythm} duration = {props.duration} currentStep = {props.currentStep}
      startFrom = {[startFrom, setStartFrom]} shiftHeld={shiftHeld} editable={props.editable}/>
    if (i%2==0){
      tinesList.push(tine);
    } else {
      tinesList.unshift(tine);
    } 
  }
  
  return(
    <>
      <div ref={tinesRef} className="KalimbaView">
        {tinesList}
      </div>
    </>
  )
}
export default KalimbaView