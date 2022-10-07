import { useState, useEffect } from "react";
import { FormControl, Button, TextField, TextArea, Divider, Rating, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TineSets from "../data/tineSets.js";
import { BASE_URL } from "../data/connection.js"

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
    let songDTO = {
      title: title,
      desc: desc,
      bpm: bpm,
      tineSet: tineSet,
      mapping: song.mapping
    }
    if (song.id){
      console.log("The song has an ID, appending to DTO")
      songDTO={
        ...songDTO,
        id: song.id,
      }
    } 
    let bearer = localStorage.getItem("bearer")
    if (bearer){
      console.log("Bearer found, attempting to upload to cloud")
      const requestOptions = {
        method: 'POST',
        headers: 
        { 
          'Content-Type': 'application/json',
          'authorization': bearer
        },
        body: JSON.stringify(songDTO) 
      };
    
      let endpoint = BASE_URL + "/songs/save"
      console.log("Endpoint: " + endpoint)
  
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.id && !song.id) {
            console.log("We have just created a new song, deleting old song and redirecting")
            localStorage.removeItem("songcache")
            window.location.href += "?id=" + data.id
          }
        });
      console.log("Saved to server")
    }
    else {
      console.log("no bearer found, uploading locally")
      localStorage.setItem("songcache",JSON.stringify(songDTO));
    }
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
      <p>Favourites</p><p>{/*song.favourites.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")*/"Some Number"}</p>
      <Button onClick={saveHandler} variant="contained" style = {{position:"absolute",bottom:"0px",right:"0px"}} disabled={!changesMade}>Save</Button>
    </div>
  )
}
export default EditSongMetaData;