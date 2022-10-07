import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./partials/header.js";
import Footer from "./partials/footer.js";
import Home from "./pages/home.js";
import Users from "./pages/users.js";
import Songs from "./pages/songs.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import EditSong from "./pages/editSong.js";
import NotFound from "./pages/notFound.js";
import Logout from "./pages/logout.js";
import UserView from "./pages/userView.js";
import SongPlay from "./pages/songPlay.js";
import MySongs from "./pages/mySongs.js";
import './App.css';
import Featured from "./pages/featured.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="songs" element={<Songs />} />
        <Route path="featured" element={<Featured />} />
        <Route path="editSong" element={<EditSong />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        <Route path="user/view" element={<UserView />} />
        <Route path="song/play" element={<SongPlay />} />
        <Route path="profile/songs" element={<MySongs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    <Footer />
  </BrowserRouter>
);