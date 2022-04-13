import { Navigate } from "react-router-dom";

const Logout = () =>{
  localStorage.removeItem("bearer");
  window.location.replace("/")
  return(
    <>
      <p>This should not be visible</p>
    </>
  )
}
export default Logout