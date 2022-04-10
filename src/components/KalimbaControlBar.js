import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from "@mui/icons-material/StopCircleOutlined";
import UploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/FileDownload';
import goToBottomIcon from '@mui/icons-material/LowPriority';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
const KalimbaControlBar = (props) =>{
  const [bpmSpeed, setBpmSpeed] = props.bpmSpeed;
  const [songPlaying, setSongPlaying] = props.songPlaying;
  const bpm = props.bpm
  const [song, setSong] = props.song;
  const [volume, setVolume] = props.volume;
  const [showClearMappingDialog, setShowClearMappingDialog] = useState(false);
  const playSong = () => {
    console.log("Playing song")
    setSongPlaying(true);
  }
  const stopSong = () => {
    console.log("Stopping song")
    props.stopSong();
  }
  const clearMapping= () => {
    let newMapping=[]
    for(let i=0; i <= song.tines.length; i++){
      newMapping.push([])
    }
    let durationIndex = newMapping.length-1;
    let defaultSongSize = 10;
    newMapping[durationIndex][defaultSongSize-1]=1;
    newMapping[durationIndex] = newMapping[durationIndex].fill(1);
    console.log(newMapping);
    setSong({
      ...song,
      mapping:newMapping,
    })
    handleClose();
  }
  const clearMappingDialog = () => {
    setShowClearMappingDialog(true);
  }
  const handleClose = () => {
    setShowClearMappingDialog(false);
  } 
  const handleFileUpload = (data) => {
    const fileToLoad = data.target.files[0];

    var fileReader = new FileReader();
    fileReader.onload = fileLoadedEvent => {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      const json = JSON.parse(textFromFileLoaded)
      console.log(json);
      setSong({
        ...song,
        title: json.title,
        desc: json.desc,
        bpm: json.bpm,
        mapping: json.mapping,
      })
    }
    fileReader.readAsText(fileToLoad, "UTF-8");
    
  }
  const songForDownload = () => {
    let safeSong = {
      title: song.title,
      desc: song.desc,
      bpm: song.bpm,
      mapping: song.mapping,
    }
    return safeSong;
  }
  const deleteDialog = (
    <Dialog
        open={showClearMappingDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove all the mapping?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={clearMapping} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
  const volumeHandleChange = (event, newValue) => {
    setVolume(newValue);
  };
  const Input = styled('input')({
    display: 'none',
  });
  let playButton;
  if (!songPlaying){
    playButton=(
      <Tooltip title="Play song from beggining">
        <IconButton variant="contained" color="success" onClick={playSong}>
          <PlayIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    )
  } else {
    playButton = (
      <Tooltip title="Song Allready Playing">
        <IconButton variant="contained" color="success" onClick={playSong}>
          <CircularProgress />
        </IconButton>
      </Tooltip>
    )
  }
  return(
    <div className="kalimbaControlBar">
      {deleteDialog}
      <div className="bpmController">
        <p>BPM  {bpm}</p>
        <Select
          id="bpmSpeedSelect"
          value={bpmSpeed}
          label="Speed"
          onChange={(e)=>{setBpmSpeed(e.target.value)}}
        >
          <MenuItem value={0.5}>Half Speed</MenuItem>
          <MenuItem value={1}>Normal Speed</MenuItem>
          <MenuItem value={2}>Double Speed</MenuItem>
        </Select>
      </div>
      <div>
        {playButton}
        <Tooltip title="Stop playing the song">
          <IconButton onClick={stopSong}>
            <StopIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Remove all current mappings (start again)">
          <IconButton onClick={clearMappingDialog}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Save current song">
          <IconButton href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(songForDownload())
            )}`}
            download={song.title + '.json'}>
            <DownloadIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      <Tooltip title="Upload Song">
        <label htmlFor="icon-button-file">
          <Input accept="json/*" id="icon-button-file" type="file" onChange={handleFileUpload}/>
          <IconButton component="span">
            <UploadIcon fontSize="large"/>
          </IconButton>
        </label>
      </Tooltip>
      </div>
      <div id="VolumeControl">
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider aria-label="Volume" value={volume} onChange={volumeHandleChange} />
          <VolumeUp />
        </Stack>
      </div>
    </div>
  )
}
export default KalimbaControlBar;