import React, { useContext, useState } from "react";
import "./CSS/Product.css";
import Toys from "../DataFile/Toy";
import { dataContext } from "../App";
import Footer from "./Footer";
import { Drawer } from "@mui/material";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Product = () => {
  var tempo = 0;
  const datacon = useContext(dataContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cate, setCate] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [visible, setVisible] = useState(false);

  //----------------Filter By category----------------//
  const searchCategory = (e) => {
    let txt = e.target.value.toLowerCase();
    setCate(txt);
    setName(txt);
  };

  //------------Filter By Price------------//
  const sortPrice = (e) => {
    let txt = e.target.value;
    setPrice(txt);
    if (txt === "High to Low") {
      datacon.proArr.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (txt === "Low to High") {
      datacon.proArr.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  };
  //----------------Clear Filter------------------//
  const clearFilter = () => {
    datacon.setProArr(
      Toys.filter((val) => {
        return true;
      })
    );
    datacon.proArr.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else {
        return -1;
      }
    });
    setCate("");
    setPrice("");
    setIsDrawerOpen(false);
  };

  //----------------Add To Cart-----------------//
  const addtocart = (e) => {
    let idx = e.target.id;
    let Quantity = 1;
    let flag = true;
    let arr1 = [];

    datacon.cartArr.forEach((val) => {
      let indx = Toys.findIndex((val) => {
        return val.id == idx;
      });
      if (val.id == idx) {
        val.Quan++;
        val.total =
          (Toys[indx].price - (Toys[indx].price * Toys[indx].discount) / 100) *
          val.Quan;
        flag = false;
      }
      datacon.setTotal(
        datacon.total +
          (Toys[indx].price - (Toys[indx].price * Toys[indx].discount) / 100)
      );
    });

    if (flag) {
      let indx = Toys.findIndex((val) => {
        return val.id == idx;
      });

      arr1 = {
        id: Toys[indx].id,
        name: Toys[indx].title,
        image: Toys[indx].img,
        Quan: Quantity,
        rating: Toys[indx].rating,
        price:
          Toys[indx].price - (Toys[indx].price * Toys[indx].discount) / 100,
        total:
          Toys[indx].price - (Toys[indx].price * Toys[indx].discount) / 100,
      };
      datacon.setCartArr([...datacon.cartArr, arr1]);
      datacon.setTotal(datacon.total + arr1.price);
    }
  };

  const search = (e) => {
    let txt = e.target.value;
    setCate(txt);
    setName(txt);
  };

  //----------Wishlist Method-----------//
  const wish = (e) => {
    Toys.forEach((item) => {
      if (item.id === e) {
        if (item.isWished === true) {
          item.isWished = false;
          datacon.setWishLIst(datacon.wishList - 1);
        } else {
          item.isWished = true;
          datacon.setWishLIst(datacon.wishList + 1);
        }
      }
    });
  };

 

  const backToTop = () => {
    const scrolls = document.documentElement.scrollTop;
    if (scrolls > 200) {
      setVisible(true);
    } else if (scrolls <= 200) {
      setVisible(false);
    }
  };
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", backToTop);
  return (
    <>
      <div className="product_main_div">
        <div className="srchDiv">
          <input
            type="text"
            placeholder="search your favourites toys"
            onChange={search}
            autoFocus
            className="searchbox"
          />
        </div>
        <h1 style={{ textAlign: "center" }}>Our Products</h1>
        <div className="FilterDiv" >
          <div onClick={() => setIsDrawerOpen(true)} className="Filterbtn">
            <button className="Filterbtns">Filter</button>
            <FilterAltIcon sx={{color:"goldenrod"}} />
          </div>
          {/*---------Filter Drawer-----------*/}
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box
              className="filterDrawer"
              p={2}
              width="250px"
              justifyContent="justify"
              role="presentation"
            >
              <div className="drawerLink">
                <h2>Filter</h2>
                <hr />
                <h3>Filter by Category-</h3>
                <input
                  type="radio"
                  name="category"
                  value=""
                  onChange={searchCategory}
                  checked={cate === "" && true}
                />
                &nbsp;<label>All</label>
                <br />
                <input
                  type="radio"
                  name="category"
                  value="Toys and Games"
                  onChange={searchCategory}
                  checked={
                    cate.toLowerCase() === "Toys and Games".toLowerCase() &&
                    true
                  }
                />
                &nbsp;<label>Toys & Games</label>
                <br />
                <input
                  type="radio"
                  name="category"
                  checked={
                    cate.toLowerCase() ===
                      "sport and Outdoors".toLowerCase() && true
                  }
                  value="sport and Outdoors"
                  onChange={searchCategory}
                />
                &nbsp;<label>sport & Outdoors</label>
                <br />
                <input
                  type="radio"
                  name="category"
                  checked={
                    cate.toLowerCase() === "Redions & cycles".toLowerCase() && true
                  }
                  value="Redions & cycles"
                  onChange={searchCategory}
                />
                &nbsp;<label>Redions and cycles</label>
                <br />
                <input
                  type="radio"
                  name="category"
                  checked={
                    cate.toLowerCase() === "Ride On Cars".toLowerCase() && true
                  }
                  value="Ride On Cars"
                  onChange={searchCategory}
                />
                &nbsp;<label>Ride On Cars</label>
                <br />
                <br />
                <h3>Sort by Price-</h3>
                <input
                  type="radio"
                  name="price"
                  checked={price === "High to Low" && true}
                  onChange={sortPrice}
                  value="High to Low"
                />
                &nbsp;<label>High to Low</label>
                <br />
                <input
                  type="radio"
                  name="price"
                  checked={price === "Low to High" && true}
                  onChange={sortPrice}
                  value="Low to High"
                />
                &nbsp;<label>Low to High</label>
                <br />
                <br />
              
                <br />
                <br />
                <button className="applybtn" onClick={clearFilter}>
                  Clear Filter
                </button>
              </div>
            </Box>
          </Drawer>
        </div>

        <div className="Product_main_div">
          {datacon.proArr.map((val, i) => {
            if (
              val.category.toLowerCase().includes(cate) ||
              val.title.toLowerCase().includes(name)
            ) {
              return (
                <div key={i} className="card">
                  <div className="ProductImage">
                    <div className="offer_div">
                      {val.discount}% <br /> off
                    </div>
                    <div className="wishDiv">
                      {val.isWished ? (
                        <>
                          <FavoriteIcon
                            sx={{ cursor: "pointer", color: "red" }}
                            onClick={() => {
                              wish(val.id);
                            }}
                            id={val.id}
                          />
                        </>
                      ) : (
                        <>
                          <FavoriteBorderIcon
                            sx={{ cursor: "pointer", color: "black" }}
                            onClick={(e) => {
                              wish(val.id);
                            }}
                            id={val.id}
                          />
                        </>
                      )}
                    </div>
                    <img className="proimage" src={val.img} alt="" />
                  </div>
                  <h3 className="prottl">{val.title}</h3>
                  <div style={{ display: "flex",justifyContent:"space-around",alignItems:"center",flexDirection:"row-reverse" }}>
                    <div>
                      <Stack spacing={1}>
                        <Rating
                          sx={{ justifyContent: "center" }}
                          name="read-only"
                          value={val.rating}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </div>
                    <div>
                      <p>
                        &#8377;{" "}
                        <span style={{ fontSize: "18px", }}>
                          {val.price - (val.price * val.discount) / 100}&nbsp;
                          <s style={{ color: "white" }}>{val.price}</s>
                        </span>
                      </p>
                    </div>
                  </div>

                  <button id={val.id} onClick={addtocart} className="addtocart">
                    ADD TO CART
                  </button>
                </div>
              );
            } else {
              tempo++;
            }
          })}
          {tempo >= datacon.proArr.length && (
            <h1 style={{ marginTop: "50px" }}> No Results Found...</h1>
          )}
        </div>
        <button
          className="bttbtn"
          onClick={goTop}
          style={{ display: visible ? "block" : "none" }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: "30px" }} />
        </button>
        <Footer />
      </div>
    </>
  );
};

export default Product;
