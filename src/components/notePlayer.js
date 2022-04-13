//import { getInstruments } from "mobx-music";

import { Howl } from "howler";

let instrument = null;
let volume=1;
const setHowlerVolume = (newVolume) => {
  volume= newVolume*0.005; //was 0.01, but wanted to cull the max volume
}
const play = async (notesToPlay) =>{
  if (!Array.isArray(notesToPlay)){
    notesToPlay = [[ notesToPlay ]]
  }
  for (let note in notesToPlay){
    //instrument.play(notesToPlay[note]);
    let noteFile = notesToPlay[note].replace("#","s")
    let sound = new Howl({
      src: [`/audio/${noteFile}.mp3`],
      volume:volume
    })
    sound.volume(volume)
    sound.play()
    await new Promise(r => setTimeout(r, 20));
  }
  
}
export default play;
export { setHowlerVolume };