import "./Navbar.css";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="navbar">
      <div className="left">
        <a href="/" className="logo-mock">
          <span className="dot"></span>
        </a>
        <ul className="links">
          <li>Wydarzenia</li>
          <li>Kontakt</li>
          <li>Wesprzyj Nas</li>
        </ul>
      </div>
      <div className="right">
        {isLoggedIn ? (
          <ul className="action links">
            <li>
              <SearchIcon />
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
            <li>
              <AccountCircleIcon onClick={() => setIsLoggedIn(false)} />
            </li>
          </ul>
        ) : (
          <>
            <ul className="action links">
              <li>
                <SearchIcon />
              </li>
            </ul>
            <button className="login-btn" onClick={() => setIsLoggedIn(true)}>
              Zaloguj się
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
