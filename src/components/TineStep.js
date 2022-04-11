import SongContextMenu from "./songContextMenu.js";
const TineStep = (props) => {
  const [beat, setBeat] = props.beat;
  const duration = props.duration;
  const [startFrom, setStartFrom] = props.startFrom;
  const toggleSound = (e) => {
    console.log(e.button)
    if (e.button==2){
      e.preventDefault();
      setStartFrom(props.id);
    }
    if (e.button==1){
      setBeat(props.id, props.addSongLength);
    }
  }
  const playFromHere = () => {
    console.log("playing from: " + props.id)
  }
  let noteLength;
  if (duration==1){
    noteLength="full";
  } else if (duration==0.5){
    noteLength="half";
  } else if (duration==0.25){
    noteLength="quarter";
  }
  let classList = "noteContainer ";
  if (props.id==props.currentStep) {
    classList+="playing "
  } else if (props.id==startFrom){
    classList+="startFrom "
  }
  return(
    <div className={classList} onMouseDown={toggleSound}>
      <div className={`TineStep ${beat(props.id)?"note " + noteLength:""} `} ></div>
    </div>
  )
}
export default TineStep;