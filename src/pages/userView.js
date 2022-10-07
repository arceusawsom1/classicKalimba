import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import SongSearchResult from "../components/songSearchResult";
import { BASE_URL } from "../data/connection";
import CircularProgress from '@mui/material/CircularProgress';
import SimpleSongList from "../components/simpleSongList";
const UserView = (props) =>{
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState({});
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
  
    let endpoint = BASE_URL + "/songs/findbyuserid?id=" + id
    let endpoint2 = BASE_URL + "/users/" + id
    console.log("Endpoint: " + endpoint)
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => setSongs(data));
    fetch(endpoint2, requestOptions)
      .then(response => response.json())
      .then(data => setUser(data));
  },[])


  return(
    <div>
      <h1>Songs made by {user.username}</h1>
      <SimpleSongList songs={[songs, setSongs]}/>
    </div>
  )
}
export default UserView;