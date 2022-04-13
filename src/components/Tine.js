import TineStep from "./TineStep"
const Tine = (props) => {
  const note = props.note;
  const [rhythm, setRhythm] = props.rhythm;
  const [duration, setDuration] = props.duration;
  const newSpaceThreshold = props.newSpaceThreshold || 5;
  const newSpaceQuantity = props.newSpaceQuantity || 5;
  const [startFrom, setStartFrom] = props.startFrom;
  const handleClick = (e) =>{
    if (e.button==1 || e.button==2){
      e.preventDefault();
    }
    let noteToPlay = note.note + (note.accidental || "") +  note.octave
    props.playNote([noteToPlay])
  }
  //Should toggle the beat at the provided index 1 -> 0.5 -> 0.25 -> 0 -> 1...
  const setBeat = (index) => {
    console.log("Shift: " + props.shiftHeld)
    let oldRhythm = rhythm(props.id) || []
    let oldDuration = duration || []
    //First we add notes to the top if they are adding a note near the top
    if (index > oldDuration.length-newSpaceThreshold){
      oldDuration[oldDuration.length+newSpaceQuantity] = 1;
      oldDuration.fill(1,oldDuration.length - newSpaceQuantity);
    }
    //Then we handle the toggling
    if (oldRhythm[index]){
      if (!props.shiftHeld){
        if (oldDuration[index]> 0.25){
          oldDuration[index]=oldDuration[index]/2;
        } else{
          oldDuration[index]=1;
          oldRhythm[index] = 0;
        }
      } else{
        oldRhythm[index]=0;
      }
      
    } else {
      oldRhythm[index] = 1; //set it to true
      oldDuration[index]=1; //set it to `1` beat
    }
    setRhythm(props.id, oldRhythm, oldDuration);
  }
  const beat = (index) => {
    return (rhythm(props.id) || [])[index] || 0;
  }
  
  let tineStepList = [];
  let addDurationTheshold = 5;
  for (let i=duration.length-1; i>=0; i--){
    let tinestep;
    tinestep = <TineStep key={i} id={i} beat={[beat, setBeat]} duration={duration[i]} currentStep={props.currentStep}
    startFrom = {[startFrom, setStartFrom]}  editable={props.editable}/>
    tineStepList.push(
      tinestep
    )
  }

  return(
    <>
      <div className={`Tine ${note.painted ? "painted" : ""}`} style={props.style} onMouseDown={handleClick} onContextMenu={(e)=>{e.preventDefault();return false;}}>
        <p>{note.note + (note.accidental || "")}</p>
        <p>{note.position}</p>
        {tineStepList}
      </div>
    </>
  )
}
export default Tine;