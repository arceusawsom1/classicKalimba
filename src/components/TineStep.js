const TineStep = (props) => {
  const [beat, setBeat] = props.beat;
  const duration = props.duration;
  const toggleSound = () => {
    setBeat(props.id);
    if (props.addSongLength){
      console.log("trying to add length")
      props.addSongLength();
    }
  }
  let noteLength;
  if (duration==1){
    noteLength="full";
  } else if (duration==0.5){
    noteLength="half";
  } else if (duration==0.25){
    noteLength="quarter";
  }
  return(
    <div className="noteContainer" onClick={toggleSound}>
      <div className={`TineStep ${beat(props.id)?"note " + noteLength:""}`} ></div>
    </div>
  )
}
export default TineStep;