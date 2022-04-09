import TineStep from "./TineStep"
const Tine = (props) => {
  const note = props.note;
  const [rhythm, setRhythm] = props.rhythm;
  const [duration, setDuration] = props.duration;
  const handleClick = () =>{
    let noteToPlay = note.note + (note.accidental || "") +  note.octave
    props.playNote([noteToPlay])
  }
  const setBeat = (index) => {
    let oldRhythm = rhythm(props.id) || []
    let newDuration=0;
    if (oldRhythm[index]){
      if (duration[props.id] > 0.25){
        newDuration=duration[props.id]/2
      } else {
        newDuration=0;
        oldRhythm[index] = false;
      }
    } else {
      newDuration=1;
      oldRhythm[index] = true;
    }
    console.log("new duration: " + newDuration)
    
    setRhythm(props.id, oldRhythm);
    setDuration(index,newDuration)
  }
  const beat = (index) => {
    return (rhythm(props.id) || [])[index] || 0;
  }  
  
  let tineStepList = [];
  
  for (let i=500; i>=0; i--){
    tineStepList.push(
      <TineStep key={i} id={i} beat={[beat, setBeat]} duration={duration[i]}>p</TineStep>
    )
  }

  return(
    <>
      <div className={`Tine ${note.painted ? "painted" : ""}`} style={props.style} onMouseDown={handleClick}>
        <p>{note.note + (note.accidental || "")}</p>
        <p>{note.position}</p>
        {tineStepList}
      </div>
    </>
  )
}
export default Tine;