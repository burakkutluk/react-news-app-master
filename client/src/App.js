import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { router } from "./config/config";
import Search from "./components/Search/Search";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Bookmarks from "./components/Bookmarks/Bookmarks";

function App() {

  return (
    <>
      <Router>
            <NavBar />
        <Routes>
          {router.map((path) => (
            <Route
              exact
              key={uuidv4()}
              path={path.path}
              element={
                <News
                  key={path.key}
                  newscategory={path.category}
                  country={path.country}
                />
              }
            />
          ))}
          <Route path="/search/:query" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
