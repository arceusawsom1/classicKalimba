import Tine from "./Tine.js";
//The Component that holds The Kalimba itself. Should support scrolling through all the tinesteps
const KalimbaView = (props) => {
  const tines = props.tines;
  const [duration, setDuration] = props.duration;
  const [rhythm, setRhythm] = props.rhythm;
  let tinesList = []

  const addSongLength = (ammount) => {
    if (!ammount){
      ammount=5;
    }
    console.log("adding: " + ammount + " of beats to the song")
    console.log(duration)
    let newDuration = [...duration];
    let newSize = duration.length + ammount
    newDuration[newSize-1] =1;
    newDuration.fill(1,duration.length-1, newSize-1);
    console.log(newDuration)
    setRhythm("duration", newDuration)
  }

  for (let i=0; i<tines.length; i++){
    let inverseIndex= tines.length-i
    let style = {
      paddingBottom:inverseIndex*10
    }
    let tine = <Tine id = {i} key={i} style={style} note = {tines[i]} playNote={props.playNote}
      rhythm ={props.rhythm} duration = {props.duration} addSongLength={addSongLength}/>
    if (i%2==0){
      tinesList.push(tine);
    } else {
      tinesList.unshift(tine);
    } 
  }
  
  return(
    <>
      <div className="KalimbaView">
        {tinesList}
      </div>
    </>
  )
}
export default KalimbaView