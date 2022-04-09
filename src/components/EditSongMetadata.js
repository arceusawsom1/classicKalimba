import { useState, useEffect } from "react";
import { FormControl, Button, TextField, TextArea, Divider, Rating } from '@mui/material';
const EditSongMetaData = (props) => {
  const [song, setSong] = props.song;
  const [prevSong, setPrevSong] = useState(song);
  const [title, setTitle] = useState(song.title);
  const [desc, setDesc] = useState(song.desc);
  const [bpm, setBpm] = useState(song.bpm)
  const [changesMade, setChangesMade] = useState(false);
  
  const saveHandler=()=>{
    console.log("Saving Song (title:" +title + ", desc: " + desc + ")");
    setChangesMade(false);
    setSong({
      ...song,
      title: title,
      desc: desc,
      bpm: bpm,
    })
  }

  useEffect(() => {
    setChangesMade(true);
  },[title,desc,bpm])

  useEffect(()=>{
    setTitle(song.title);
    setDesc(song.desc)
    setBpm(song.bpm)
    setPrevSong(song)
  },[song])

  const inputStyle = {
    margin:"15px",
  }

  return(
    <div style={{position:"relative",height:"100%",width:"100%"}}>
      <FormControl sx={{width:"100%"}}>
        <TextField 
          label="Title"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          sx={inputStyle}
        />
        <TextField
          multiline
          label="Description"
          value={desc}
          rows={6}
          onChange={(e) => setDesc(e.target.value)}
          sx={inputStyle}
        />
        <TextField
          label="Default BPM"
          type="number"
          value={bpm}
          sx={inputStyle}
          onChange={(e)=>{setBpm(e.target.value)}}
        />
      </FormControl>
      <Divider />
      <p>Rating</p><Rating name="half-rating-read" defaultValue={song.rating} precision={0.5} readOnly />
      <p>Favourites</p><p>{song.favourites.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      <Button onClick={saveHandler} variant="contained" style = {{position:"absolute",bottom:"0px",right:"0px"}} disabled={!changesMade}>Save</Button>
    </div>
  )
}
export default EditSongMetaData;