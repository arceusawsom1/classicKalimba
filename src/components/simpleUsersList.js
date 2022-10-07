import { CircularProgress } from "@mui/material";
import SimpleUserView from "./simpleUserView";
import SongSearchResult from "./songSearchResult";

const SimpleUserList = (props) => {
  const [users, setUsers] = props.users;
  let domUsers=[];
  for (let a=0; a<users.length; a++){
    let user=users[a];
    domUsers.push(
      <SimpleUserView key={a} user={user}/>
    )
  }
  return (
    <>
      {users.length>0 && domUsers}
      {users.length>0 || <CircularProgress size={"200px"} sx={{margin:"auto"}} />}
    </>
  )

}
export default SimpleUserList;