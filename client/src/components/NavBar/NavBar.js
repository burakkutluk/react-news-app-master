import React, { useEffect, useRef, useState } from "react";
import {
  IoBookmarksOutline,
  IoCloseOutline,
  IoPersonAddSharp,
} from "react-icons/io5";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { navbarBrand, navs } from "../../config/config";
import logoImage from "../Images/logoImage.png";
import { IoIosSearch } from "react-icons/io";
import "../NavBar/style.css";
import {
  btnColor,
  formInput,
  logo,
  nav,
  navBar,
  navBrand,
  closeBtn,
  searchForm,
  icons,
} from "./index";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();

  const navRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
    setIsCollapsed(true);
  };

  const handleNavClick = () => {
    setIsCollapsed(true);
  };

  const isSearchButtonDisabled = searchQuery.trim() === "";

  useEffect(() => {
    document.title = "Home - Dashboard";
    axios
      .get("http://localhost:3002/users/logout")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));
  });


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 ) {
        navRef.current.classList.add("shadow");
      }else {
        navRef.current.classList.remove("shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return ( 
    <>
      <Navbar
        ref={navRef}
        style={navBar}
        variant="dark"
        expand="lg"
        fixed="top"
        expanded={!isCollapsed}
        className="header"
      >
        <Navbar.Brand style={navBrand} href="/">
          <img src={logoImage} alt="Logo" style={logo} />
          {navbarBrand}
        </Navbar.Brand>
        {isCollapsed && (
          <Navbar.Toggle
            className="border-0"
            aria-controls="basic-navbar-nav"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        {!isCollapsed && (
          <IoCloseOutline
            size={40}
            style={closeBtn}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={nav} className="mr-auto" onClick={handleNavClick}>
            {navs.map((navItem) => (
              <LinkContainer to={navItem.page} key={uuidv4()}>
                <Nav.Link className="ml-2">{navItem.nav}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>

          <Form style={searchForm} onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Explore news..."
              style={formInput}
              className="form-control-lg bg-transparent mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0 text-white shadow-sm border-dark"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button
              className="btn custom-btn mt-lg-2 ml-2 mt-md-2 mt-sm-2 mt-xl-0 shadow-sm"
              style={btnColor}
              onClick={handleSubmit}
              disabled={isSearchButtonDisabled}
            >
              <IoIosSearch style={{ display: "flex", fontSize: "35px" }} />
            </Button>
          </Form>

          <div style={icons}>
            <Link to="/bookmarks">
              <IoBookmarksOutline size={25} color="white" />
            </Link>
            <Link to="/login">
              <IoPersonAddSharp size={26} />
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
