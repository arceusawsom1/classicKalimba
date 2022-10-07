import { CircularProgress } from "@mui/material";
import SongSearchResult from "./songSearchResult";

const SimpleSongList = (props) => {
  const [songs, setSongs] = props.songs;
  let domSongs=[];
  for (let a=0; a<songs.length; a++){
    let song=songs[a];
    domSongs.push(
      <SongSearchResult song={song} key={a}/>
    )
  }
  return (
    <>
      {songs.length>0 && domSongs}
      {songs.length>0 || <CircularProgress size={"200px"} sx={{margin:"auto"}} />}
    </>
  )

}
export default SimpleSongList;