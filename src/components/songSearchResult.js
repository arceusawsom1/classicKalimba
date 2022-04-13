import { FormControl, Button, TextField, TextArea, Divider, Rating, InputLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from 'react';
import { BASE_URL } from '../data/connection';
const SongSearchResult = (props) => {
  console.log(props)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  //the view for MySongs
  let song = props.song || {
    id:"SomeSongId",
    title:"Song Title",
    tineSet:0,
    creator:{
      id: "SomeDummyId",
      username: "SomeDummy",
    }
  }
  const handleOpen = () => {
    setShowDeleteDialog(true);
  }
  const handleClose = () => {
    setShowDeleteDialog(false);
  } 
  const deleteSong = (songId) => {
    console.log("deleting: " + songId)
    

    let bearer = localStorage.getItem("bearer")
    if (bearer){
      const requestOptions = {
        method: 'GET',
        headers: 
        { 
          'Content-Type': 'application/json',
          'authorization': bearer
        },
      };
    
      let endpoint = BASE_URL + "/songs/delete?id=" + song.id
      console.log("Endpoint: " + endpoint)

      fetch(endpoint, requestOptions)
        .then(response => deleteComplete(response))
        //.then(data => updateSongList(data));
    }
  }

  const deleteComplete = (data) => {
    console.log(data);
    props.refreshCallback();
    handleClose();
  }

  const deleteDialog = (songId) => (
    <Dialog
        open={showDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the song (THIS ACTION CAN'T BE UNDONE!)
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={(e)=>deleteSong(songId)} autoFocus color='error' variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )



  if (props.longView){
    return (
      <div className={"SongSearchResultLong"}>
        {deleteDialog(song.id)}
        <h3>{song.title}</h3>
        <p>Scale: {song.tineset==0 ? "C Major":"G Major"}</p>
        <p>BPM: {song.bpm}</p>
        <Button variant="outlined" color="error" onClick={handleOpen}>Delete</Button>
        <Button variant="outlined" href={"/editSong?id=" + song.id}>Edit</Button>
        <Button variant={"contained"} href={"/song/play?id=" + song.id}>Play!</Button>
      </div>
    )
  } 
  //The view for the songs tab
  else {
    return(
      <div className={"SongSearchResult"}>
        <p>{song.title}</p>
        <p>Scale: {song.tineset==0 ? "C Major":"G Major"}</p>
        <p>BPM: {song.bpm}</p>
        <a href ={"/user/view?id=" + song.creator.id}>{song.creator.username}</a>
        <Button variant={"contained"} href={"/song/play?id=" + song.id}>Play!</Button>
      </div>
    )
  }
  
}
export default SongSearchResult;