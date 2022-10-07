import { useState } from "react";
import { BASE_URL } from "../data/connection.js"
import { FormControl, Button, TextField, TextArea, Divider, Rating, InputLabel } from '@mui/material';
import ErrorBox from '../components/errorBox';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const handleSubmit = () => {
    let data = {
      username: username,
      password: password,
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  
    let endpoint = BASE_URL + "/users/login"
    console.log("Endpoint: " + endpoint)

    fetch(endpoint, requestOptions)
      .then(response => {
        let bearer = response.headers.get("authorization")
        if (bearer){
          localStorage.setItem("bearer",bearer)
          window.location.replace("/")
        } else if (response.status==403){
          setError(["Invalid username or password"])
        } else {
          setError(["Something went wrong"])
        }
        
      });
  }
  let inputStyle={
    margin:"20px 0px"
  }
  let usernameInput=(
    <>
      <TextField 
          label="username"
          value={username} 
          autoComplete={"username"}
          onChange={(e) => setUsername(e.target.value)}
          sx={inputStyle}
        />
    </>
  )
  let passwordInput=(
    <>
      <TextField 
          label="Password"
          type="password"
          value={password} 
          autoComplete={"current-password"}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyle}
        />
    </>
  )

  return(
    <div className="loginContainer">
      <div className="login">
        <form>
          <FormControl sx={{width:"100%"}}>
            <ErrorBox errors={error} />
            {usernameInput}
            {passwordInput}
            <Button variant="contained" onClick={handleSubmit}>Log in</Button>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
export default Login;