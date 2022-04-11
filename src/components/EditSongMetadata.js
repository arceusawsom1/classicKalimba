import { useState, useEffect } from "react";
import { FormControl, Button, TextField, TextArea, Divider, Rating, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TineSets from "../data/tineSets.js";

const EditSongMetaData = (props) => {
  const [song, setSong] = props.song;
  const [prevSong, setPrevSong] = useState(song);
  const [title, setTitle] = useState(song.title);
  const [desc, setDesc] = useState(song.desc);
  const [bpm, setBpm] = useState(song.bpm)
  const [tineSet, setTineSet] = useState(song.tineSet);
  const [changesMade, setChangesMade] = useState(false);
  
  
  const saveHandler=()=>{
    console.log("Saving Song (title:" +title + ", desc: " + desc + ")");
    setChangesMade(false);
    setSong({
      ...song,
      title: title,
      desc: desc,
      bpm: bpm,
      tineSet: tineSet,
      tines: [
        ...TineSets[tineSet]
      ]
    })
  }

  useEffect(() => {
    setChangesMade(true);
  },[title,desc,bpm,tineSet])

  useEffect(()=>{
    setTitle(song.title);
    setDesc(song.desc)
    setBpm(song.bpm)
    setTineSet(song.tineSet)
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
        <InputLabel id="dropDownTineSet-label">Scale</InputLabel>
        <Select
          labelId="dropDownTineSet-label"
          id="dropDownTineSet"
          value={tineSet}
          label="Scale"
          onChange={(e)=>{setTineSet(e.target.value)}}
          sx={inputStyle}
        >
          <MenuItem value={0}>C Major</MenuItem>
          <MenuItem value={1}>G Major</MenuItem>
        </Select>
      </FormControl>
      <Divider />
      <p>Rating</p><Rating name="half-rating-read" defaultValue={song.rating} precision={0.5} readOnly />
      <p>Favourites</p><p>{song.favourites.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
      <Button onClick={saveHandler} variant="contained" style = {{position:"absolute",bottom:"0px",right:"0px"}} disabled={!changesMade}>Save</Button>
    </div>
  )
}
export default EditSongMetaData;