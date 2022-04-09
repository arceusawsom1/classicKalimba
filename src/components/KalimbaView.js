import Tine from "./Tine.js";
//The Component that holds The Kalimba itself. Should support scrolling through all the tinesteps
const KalimbaView = (props) => {
  const tines = props.tines;
  let tinesList = []
  //APPARENTLY SOMETHING ABOUT THIS LOOP IS WRONG!!!! IT CRASHES THE PROGRAM
  for (let i=0; i<tines.length; i++){
    let inverseIndex= tines.length-i
    let style = {
      paddingBottom:inverseIndex*10
    }
    let tine = <Tine id = {i} key={i} style={style} note = {tines[i]} playNote={props.playNote}
      rhythm ={props.rhythm} duration = {props.duration}/>
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