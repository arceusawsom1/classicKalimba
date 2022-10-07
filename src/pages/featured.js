import { useState, useEffect } from "react";
import { BASE_URL } from "../data/connection";
import SimpleSongList from "../components/simpleSongList";

const Featured = () => {
  const [songs, setSongs] = useState([]);
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
  
    let endpoint = BASE_URL + "/songs/featured"
    console.log("Endpoint: " + endpoint)

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => setSongs(data));
  },[])

  return(
    <div>
      <h1>Featured Songs</h1>
      <SimpleSongList songs={[songs, setSongs]}/>
    </div>
  )
}
export default Featured;