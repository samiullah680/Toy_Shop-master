import React, { useContext, useState } from "react";
import "./CSS/Cart.css";
import { dataContext } from "../App";
import {
  IconButton,
  Modal,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import Toy from "../DataFile/Toy";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const datacon = useContext(dataContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [snackmsg, setSnackmsg] = useState("");
  const [key, SetKey] = useState("");

  const increase = (i) => {
    datacon.cartArr.forEach((val) => {
      let indx = Toy.findIndex((obj) => {
        return obj.id === i;
      });
      if (val.id === i) {
        val.Quan++;
        val.total =
          (Toy[indx].price - (Toy[indx].price * Toy[indx].discount) / 100) *
          val.Quan;
      }
      datacon.setTotal(
        datacon.total +
          (Toy[indx].price - (Toy[indx].price * Toy[indx].discount) / 100)
      );
    });
  };

  const decrease = (i) => {
    let flag = true;
    datacon.cartArr.forEach((val) => {
      let indx = Toy.findIndex((obj) => {
        return obj.id === i;
      });
      if (val.id === indx) {
        if (val.Quan === 1) {
          flag = false;
        }
        if (flag) {
          if (val.id === indx) {
            console.log(i);
            val.Quan--;
            val.total =
              (Toy[indx].price - (Toy[indx].price * Toy[indx].discount) / 100) *
              val.Quan;
          }
          datacon.setTotal(
            datacon.total -
              (Toy[indx].price - (Toy[indx].price * Toy[indx].discount) / 100)
          );
        }
      }
    });
  };

  const remove = (i, txt) => {
    if (txt === "Remove Item From Bag") {
      SetKey(i);
      setOpen(true);
    } else if (txt === "Confirm") {
      let amt = datacon.cartArr[i].total;
      datacon.cartArr.splice(i, 1);
      datacon.setTotal(datacon.total - amt);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
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

  const CheckOut = () => {
    if (!datacon.isloggedin) {
      setSnackmsg("Please Login first");
      setOpen2(true);
    } else if (datacon.isloggedin) {
      setSnackmsg("Redirecting to Checkout page ");
      setTimeout(() => {
        setOpen2(true);
      }, 1000);
      setTimeout(() => {
        datacon.setShowNav(false);
        nav("/checkout");
      }, 3000);
    }
  };

  const shop = () => {
    nav("/product");
  };
  return (
    <div className="cart">
      {datacon.cartArr.length !== 0 ? (
        <>
          <div className="cart_div">
            <div className="cartcondiv">
              {datacon.cartArr.map((val, i) => {
                return (
                  <>
                    <div className="cartcon">
                      <div>
                        <img src={val.image} className="cartimg" alt="" />
                      </div>
                      <div className="nameQuan">
                        <div>
                          <p>
                            <strong>{val.name}</strong>
                          </p>
                          <p>
                            <button
                              onClick={() => {
                                decrease(val.id);
                              }}
                              className="incdecbtn"
                            >
                              -
                            </button>
                            &emsp;<span className="quanNo">{val.Quan}</span>
                            &emsp;
                            <button
                              onClick={() => {
                                increase(val.id);
                              }}
                              className="incdecbtn"
                            >
                              +
                            </button>
                          </p>
                          <p>
                            <span className="prichead">Intial Price:</span>{" "}
                            &#8377; <span className="prices"> {val.price}</span>
                          </p>
                          <p>
                            <span className="prichead">Total Price:</span>{" "}
                            &#8377; <span className="prices"> {val.total}</span>
                          </p>
                        </div>
                      </div>
                      <div className="rmbtndiv">
                        <button
                          onClick={(e) => {
                            remove(i, e.target.innerHTML);
                          }}
                          className="rifcbtn"
                        >
                          Remove Item From Bag
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="checkoutDiv">
              <div className="CheckOutSec">
                <div className="elementcheck">
                  <p>
                    <strong>{datacon.cartArr.length} Item</strong>
                  </p>
                  <p>
                    <strong>&#8377; {datacon.total}</strong>
                  </p>
                </div>
                <hr style={{ margin: "0px 10px" }} />
                <div className="elementcheck">
                  <p>
                    <strong>Total</strong>
                  </p>
                  <p>
                    <strong>&#8377; {datacon.total}</strong>
                  </p>
                </div>
                <p>
                  <button onClick={CheckOut} className="CheckoutBtn">
                    Proceed to Checkout
                  </button>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1 style={{ textAlign: "center" }}>Your Cart is Empty...</h1>
            <p style={{ textAlign: "center", fontSize: "100px" }}>&#128546;</p>
            <p style={{ textAlign: "center" }}>
              <button onClick={shop} className="gts">
                Go back to Shop
              </button>
            </p>
          </div>
        </>
      )}
      {/*--------------Remove item confirmation modal--------------*/}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 250,
            bgcolor: "White",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Are you sure to remove Item from cart?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            <button
              id={key}
              className="confirm"
              onClick={(e) => {
                remove(e.target.id, e.target.innerHTML);
              }}
            >
              Confirm
            </button>
            &emsp;
            <button id="cancel" className="cancelbtn" onClick={remove}>
              Cancel
            </button>
          </Typography>
        </Box>
      </Modal>
      <Snackbar open={open2} autoHideDuration={4000} onClose={handleClose}>
        <SnackbarContent
          sx={{ backgroundColor: "#1b8ad2" }}
          message={snackmsg}
          action={action}
        ></SnackbarContent>
      </Snackbar>
    </div>
  );
};

export default Cart;
