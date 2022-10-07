import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Drawer, List, ListItemText, ListItemIcon, ListItem, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Sidebar from './sidebar';
const Header = () => {
  const [ showDrawer, setShowDrawer ] = useState(false); 
  let bearer = localStorage.getItem("bearer");
  let acct;
  if (bearer){
    acct=(
      <Button color="inherit" onClick={()=>{localStorage.removeItem("bearer");window.location.replace("/")}}>Logout</Button>
    )
  } else{
    acct=(
      <>
        <Button color="inherit" href="/login">Login</Button>
        <Button color="inherit" href="/register">Register</Button>
      </>
    )
  }

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Drawer
              open={showDrawer}
              onClose={toggleDrawer}
            >
              <Sidebar toggleDrawer={toggleDrawer} bearer={bearer}/>
            </Drawer>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="inherit">
              KalimbaLive 
            </Typography>
            <Button color="inherit" href="/editSong">Create New Song</Button>
            {acct}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
export default Header;