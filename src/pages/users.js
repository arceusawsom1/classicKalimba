import { useEffect, useState } from "react";
import SimpleUserList from "../components/simpleUsersList";
import { BASE_URL } from "../data/connection";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
  
    let endpoint = BASE_URL + "/users"
    console.log("Endpoint: " + endpoint)

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => setUsers(data));
  },[])

  return(
    <div>
      <h1>Users</h1>
      <SimpleUserList users={[users,setUsers]}/>
    </div>
  )
}
export default Users;