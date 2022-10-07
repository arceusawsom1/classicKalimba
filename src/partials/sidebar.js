import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Sidebar = ({toggleDrawer, bearer}) => {
  return(
    <Box sx={{width:250}} role="presentation" onClick={()=>{toggleDrawer()}}>
      <List>
        <ListItem button onClick={()=>{window.location.replace("/")}}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"}/>
        </ListItem>
        <ListItem button onClick={()=>{window.location.replace("/songs")}}>
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText primary={"Songs"}/>
        </ListItem>
        <ListItem button onClick={()=>{window.location.replace("/users")}}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={"Users"}/>
        </ListItem>
        <Divider />
        <ListItem button onClick={()=>{window.location.replace("/editSong")}}>
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText primary={"Make new song"}/>
        </ListItem>
        {bearer!=null && 
          <>
            <ListItem button onClick={()=>{window.location.replace("/profile")}}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"My Profile"}/>
            </ListItem>
            <ListItem button onClick={()=>{window.location.replace("/profile/songs")}}>
              <ListItemIcon>
                <RecordVoiceOverIcon />
              </ListItemIcon>
              <ListItemText primary={"My Songs"}/>
            </ListItem>
          </>
        }
      </List>
    </Box>
  )
}
export default Sidebar;