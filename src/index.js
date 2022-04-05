import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Header from "./partials/header.js";
import Footer from "./partials/footer.js";
import Home from "./pages/home.js";
import Users from "./pages/users.js";
import Songs from "./pages/songs.js";
import NotFound from "./pages/notFound.js";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="songs" element={<Songs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    <Footer />
  </BrowserRouter>,
  rootElement
);