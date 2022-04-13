import { FormControl, Button, TextField, TextArea, Divider, Rating, InputLabel } from '@mui/material';
import {useEffect, useState} from "react";
import { BASE_URL } from "../data/connection";
import ErrorBox from '../components/errorBox';
const Register = () => {
  const [error, setError] = useState([]);
  const [email, setEmail] = useState("a");
  const [password, setPassword] = useState("b");
  const [confirmPassword, setConfirmPassword] = useState("c");
  const [username, setUsername] = useState("d");
  let inputStyle={
    margin:"20px 0px"
  }
  let emailInput=(
    <>
      <TextField 
          label="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyle}
        />
    </>
  )
  let confirmPasswordInput=(
    <>
      <TextField 
          label="Confirm Password"
          type="password"
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={inputStyle}
        />
    </>
  )
  let usernameInput=(
    <>
      <TextField 
          label="username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          sx={inputStyle}
        />
    </>
  )
  const validateAndSend = () => {
    let validated=true;
    let errors=[]
    if (email==""){
      validated=false;
      errors.push("Please enter an email");
    }
    if (username==""){
      validated=false;
      errors.push("Please enter a username")
    }
    if (password==""){
      validated=false;
      errors.push("Please enter a password")
    }
    if (confirmPassword==""){
      validated=false;
      errors.push("Please enter a password confirmation")
    }
    if (password!=confirmPassword){
      validated=false;
      errors.push("Password and Password Confirmation do not match")
    }
    if (validated){
      setError([]);
      console.log("submitting form to server");
      let data = {
        email: email,
        password: password,
        username: username,
      }
      const requestOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
    
      let endpoint = BASE_URL + "/users/register";
      console.log("Endpoint: " + endpoint)
  
      fetch(endpoint, requestOptions)
        .then(response => registrationFeedback(response))
    } else{
      setError(errors);
    }
  }

  const registrationFeedback = (data) => {
    console.log(data);
    if (data.status==208){
      setError(["Username '" + username + "' is taken"])
    } else{
      console.log("Successfull registration");
      window.location.replace("/login");
    }
  }
  
  return(
    <div className={"registerController"}>
      <div className={"register"}>
        <h1>Register</h1>
        <FormControl sx={{width:"100%"}}>
          <ErrorBox errors={error} />
          {emailInput}
          {usernameInput}
          {passwordInput}
          {confirmPasswordInput}
          <Button variant="contained" onClick={validateAndSend}>Register</Button>
        </FormControl>
      </div>
      
    </div>
  )
}
export default Register;