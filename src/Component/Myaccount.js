import React, { useContext, useRef, useState } from "react";
import "./CSS/Myaccount.css";
import { dataContext } from "../App";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Myaccount = () => {
  const datacon = useContext(dataContext);
  const emailref = useRef(null);
  const passwordRef = useRef(null);
  const [open, setOpen] = useState(false);

  const login = () => {
    if (emailref !== "" && passwordRef !== "") {
      datacon.setIsloggedin(true);
    }
  };

  const logout = () => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
    setTimeout(() => {
      datacon.setIsloggedin(false);
    }, 5000);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="account_main_div">
      {!datacon.isloggedin ? (
        <div className="login">
          <div className="loghead">
            <h2>Log In</h2>
          </div>
          <table>
            <tr>
              <td>
                <input
                  className="log"
                  type="email"
                  id="email"
                  ref={emailref}
                  placeholder="Write Your Email Address"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="log"
                  id="passw"
                  type="password"
                  ref={passwordRef}
                  placeholder="Write Your Password "
                />
              </td>
            </tr>
          </table>
          <div className="logbtns">
            <button onClick={login} className="loginbtn">
              Login
            </button>
          </div>
          <div className="sample">
            <span>Sample email- ejaz123@gmail.com and password:- 1235</span>
          </div>
        </div>
      ) : (
        <div className="detailtable">
          <h2 style={{textAlign:"center"}}>Your Details:</h2>
          <table className="infotable">
            
            <tr>
              <th>Name: </th>
              <td>XYZ</td>
            </tr>
            <tr>
              <th>Phone Number: </th>
              <td>9876543210</td>
            </tr>
            <tr>
              <th>Email: </th>
              <td>abc12@gmail.com</td>
            </tr>
            <tr>
              <th>Address: </th>
              <td>Vishwas khand, Gomti Nagar</td>
            </tr>
          </table>
          <div className="logoutbtndiv">
            <button className="logout_btn" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <SnackbarContent
          sx={{ backgroundColor: "#1b8ad2" }}
          message="Logging Out..."
          action={action}
        />
      </Snackbar>
    </div>
  );
};

export default Myaccount;
