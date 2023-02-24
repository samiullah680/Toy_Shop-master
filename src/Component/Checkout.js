import React, { useContext } from "react";
import "./CSS/Checkout.css";
import { dataContext } from "../App";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const datacon = useContext(dataContext);
  const nav = useNavigate();
  const Home = () => {
    datacon.setShowNav(true);
    datacon.setCartArr([]);
    datacon.setTotal(0);
    nav("/product");
  };
  return (
    <div className="checkoutMainDiv">
      <div className="checkoutimg">
        <img
          style={{ width: "150px" }}
          src="https://cdn2.iconfinder.com/data/icons/shopping-e-commerce-2-1/32/Success-Place-Order-Complete-Shopping-Tick-512.png"
          alt=""
        />
      </div>
      <h2>
        Congratulations
        <br />
        Your Order has been placed...
      </h2>
      <p>
        <button className="goHome" onClick={Home}>
          Continue shopping
        </button>
      </p>
    </div>
  );
};

export default Checkout;
