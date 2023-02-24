import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Drawer } from "@mui/material";
import { dataContext } from "../App";
import Toy from "../DataFile/Toy";

const Navbar = () => {
  var temp = 0;
  const searchdata = useContext(dataContext);
  const [open3, setOpen3] = useState(false);
  const [snackmsg, setSnackmsg] = useState("");
  const [theme, setTheme] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpen2, setIsdrawerOpen2] = useState(false);

  //------------Remove Item from wishlist------------//
  const remove = (e) => {
    Toy.forEach((val) => {
      if (val.id === e) {
        val.isWished = false;
        searchdata.setWishLIst(searchdata.wishList - 1);
        setOpen3(true);
        setSnackmsg("Item Removed From WishList");
      }
    });
  };

  //-----------Move item to cart from Wishlist------------//
  const move = (e) => {
    console.log(e);
    let arr1 = [];
    let flag = true;
    let Quantity = 1;
    searchdata.cartArr.forEach((obj) => {
      let indx = Toy.findIndex((val) => {
        return val.id === e;
      });
      if (obj.id === e) {
        console.log("agaya");
        obj.Quan++;
        obj.total =
          (Toy[indx].price - (Toy[indx].price * Toy[indx].discount) / 100) *
          obj.Quan;
        flag = false;
      }
      Toy[e].isWished = false;
      searchdata.setWishLIst(searchdata.wishList - 1);
      searchdata.setTotal(
        searchdata.total +
          (Toy[indx].price - (Toy[indx].price * Toy[indx].discount) / 100)
      );
    });
    if (flag) {
      arr1 = {
        id: Toy[e].id,
        name: Toy[e].title,
        image: Toy[e].img,
        price: Toy[e].price - (Toy[e].price * Toy[e].discount) / 100,
        total: Toy[e].price - (Toy[e].price * Toy[e].discount) / 100,
        rating: Toy[e].rating,
        Quan: Quantity,
      };
      Toy[e].isWished = false;
      searchdata.setWishLIst(searchdata.wishList - 1);
      searchdata.setCartArr([...searchdata.cartArr, arr1]);
      searchdata.setTotal(searchdata.total + arr1.price);
    }
    setOpen3(true);
    setSnackmsg("Item Moved to Bag");
  };

  //-----------Changing Theme-------------//
  const changeTheme = () => {
    setTheme(!theme);
    document.body.classList.toggle("themes");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen3(false);
  };

  const closeNavDrawer = () => {
    setIsDrawerOpen(false);
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
    <>
      <div className="nav">
        <div className="navbar">
          <div className="hamburger">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon className="menu_icon"></MenuIcon>
            </IconButton>
          </div>
          <div className="head">
            <Link to="/" className="logohead">
              <h2 className="logo_heading">kids Playground</h2>
            </Link>
          </div>
          <div className="navLinks1">
            <ul>
              <li>
                <Link className="nav_links" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav_links" to="/product">
                  Our Toy products
                </Link>
              </li>
              <li>
                <Link className="nav_links" to="/myaccount">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/*-------------Navigation Links drawer------------*/}
          <div>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box
                className="navlinkdrawer"
                p={2}
                width="200px"
                justifyContent="justify"
                role="presentation"
              >
                <div className="drawerLink">
                  <div style={{ color: "#e46713", marginBottom: "10px" }}>
                    <h3>Quick Links</h3>
                  </div>
                  <Divider />
                  <ul>
                    <li>
                      <Link
                        onClick={closeNavDrawer}
                        className="nav_links"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={closeNavDrawer}
                        className="nav_links"
                        to="/product"
                      >
                        Our Toy Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={closeNavDrawer}
                        className="nav_links"
                        to="/myaccount"
                      >
                        My Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </Box>
            </Drawer>
          </div>
          <div className="navlinks2">
            <span
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={changeTheme}
            >
              {theme ? (
                <DarkModeIcon sx={{ fontSize: "25px", color: "#e41b37" }} />
              ) : (
                <LightModeIcon sx={{ fontSize: "25px", color: "#e41b37" }} />
              )}
            </span>
            <span className="ssicons">
              <Badge
                onClick={() => {
                  setIsdrawerOpen2(true);
                }}
                badgeContent={searchdata.wishList}
                sx={{ mt: "-15px" }}
                color="error"
              >
                <FavoriteIcon sx={{ color: "#e41b37" }} />
              </Badge>
            </span>
            &emsp;
            <Link className="ssicons" to="/cart">
              <Badge
                badgeContent={searchdata.cartArr.length}
                sx={{ mt: "-15px" }}
                color="error"
              >
                <ShoppingCartIcon sx={{ color: "#e41b37" }} />
              </Badge>
            </Link>
          </div>

          {/*---------------Wishlist Drawer----------------*/}
          <div>
            <Drawer
              anchor="right"
              open={isDrawerOpen2}
              onClose={() => setIsdrawerOpen2(false)}
            >
              <Box
                className="drawercart"
                p={4}
                width="300px"
                justifyContent="justify"
                role="presentation"
                minHeight="100vh"
                maxHeight="fit-content"
              >
                <CloseIcon
                  onClick={() => setIsdrawerOpen2(false)}
                  fontSize="large"
                />
                <div>
                  <h3> Your WishList</h3>
                </div>
                {Toy.map((item) => {
                  if (item.isWished === true) {
                    return (
                      <>
                        <div className="wishDiv1">
                          <div>
                            <img
                              style={{ width: "100px", height: "100px" }}
                              src={item.img}
                              alt=""
                            />
                          </div>
                          <div style={{ marginLeft: "10px" }}>
                            <p>
                              <strong>{item.title}</strong>
                            </p>
                            <p>
                              <strong>Price:-</strong> &#8377;
                              <span>
                                {item.price -
                                  (item.price * item.discount) / 100}
                              </span>
                              &nbsp;
                              <s style={{ color: "#1f1d1d", fontSize: "15px" }}>
                                {item.price}
                              </s>
                            </p>
                          </div>
                        </div>

                        <div className="rmbtns">
                          <button
                            onClick={() => {
                              remove(item.id);
                            }}
                            className="Rfwb"
                          >
                            Remove from Wishlist
                          </button>
                          &nbsp;
                          <button
                            onClick={() => {
                              move(item.id);
                            }}
                            className="mtcb"
                          >
                            move to cart
                          </button>
                        </div>
                        <hr />
                      </>
                    );
                  } else {
                    temp++;
                  }
                })}
                {temp >= Toy.length && (
                  <h1 style={{ marginTop: "50px" }}> Empty Wishlist...</h1>
                )}
                <Snackbar
                  open={open3}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <SnackbarContent
                    sx={{ backgroundColor: "#1b8ad2" }}
                    message={snackmsg}
                    action={action}
                  ></SnackbarContent>
                </Snackbar>
              </Box>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
