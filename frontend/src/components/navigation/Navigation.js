import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { navToggler, rupee, signout } from "../../utils/icons";
import { menuItems } from "../../utils/menuItems";
import { useGlobalContext } from "../../context/globalContext";

function Navigation({ active, setActive }) {
  const { netWorth } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    netWorth(); // Invoke netWorth during the component's lifecycle

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [netWorth]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the token
    localStorage.removeItem("username"); // Clear the username
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="d-none d-lg-block">
        <div className="navigation">
          <div className="user-con">
            <img className="logo" src="/images/avatar.webp" alt="avatar" />
            <div className="text">
              <h2>{username || "Guest"}</h2> {/* Display username or "Guest" */}
              <p>
                {rupee} {netWorth()}
              </p>
            </div>
          </div>
          <ul className="menu-items">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setActive(item.id)}
                className={active === item.id ? "active" : ""}
                aria-label={`Navigate to ${item.title}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
          <div className="bottom-nav">
            <li onClick={handleSignOut} aria-label="Sign out">
              {signout} Sign Out
            </li>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="d-lg-none bg-transparent z-1 position-absolute top-0 end-0">
        <Button variant="light" onClick={handleShow} aria-label="Open navigation">
          {navToggler}
        </Button>
        <Offcanvas show={show} onHide={handleClose} className="navigation">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="user-con">
                <img className="logo" src="/images/avatar.webp" alt="avatar" />
                <div className="text">
                  <h2>{username || "Guest"}</h2> {/* Display username or "Guest" */}
                  <p>
                    {rupee} {netWorth()}
                  </p>
                </div>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-block">
            <ul className="menu-items">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    handleClose(); // Close the menu on selection
                  }}
                  className={active === item.id ? "active" : ""}
                  aria-label={`Navigate to ${item.title}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="bottom-nav">
              <li onClick={handleSignOut} aria-label="Sign out">
                {signout} Sign Out
              </li>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default Navigation;
