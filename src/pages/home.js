import { Button } from "@mui/material";

const Home = () => {
  return(
    <div style={{"textAlign":"center"}}>
      <h1 style={{color:"white"}}>Kalimba Live</h1>
      <img style={{width:100 + "%", "-webkit-mask-image": "-webkit-gradient(linear, left top,  left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))"}} src="wallpaper.png"></img>
      <div className="buttonContainer">
        <Button onClick={()=>{window.location.href="/featured"}} variant="contained" style={{"display":"inline"}}>View Featured Songs</Button>
      </div>
      <div className="buttonContainer">
        <Button onClick={()=>{window.location.href="/songs"}} variant="outlined" style={{"display":"inline"}}>View All Songs</Button>
      </div>
      <div className="buttonContainer">
        <Button onClick={()=>{window.location.href="/editSong"}} variant="outlined" style={{"display":"inline"}}>Create Song</Button>
      </div>
    </div>
  )
}
export default Home;