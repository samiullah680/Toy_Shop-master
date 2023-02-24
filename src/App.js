import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Myaccount from "./Component/Myaccount";
import Product from "./Component/Product";
import { createContext, useState } from "react";
import Checkout from "./Component/Checkout";
import Toy from "./DataFile/Toy";
import Cart from "./Component/Cart";

const dataContext = createContext();

function App() {
  const [categories, setCategories] = useState("all");
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [proArr,setProArr] = useState(Toy.filter((item)=> {return true;}));
  const [cartArr, setCartArr] = useState([]);
  const [wishList,setWishLIst] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [isloggedin, setIsloggedin] = useState(false);
  return (
    <>
      <BrowserRouter>
        <dataContext.Provider
          value={{
            categories,
            setCategories,
            name,
            setName,
            total,
            setTotal,
            proArr,
            setProArr,
            cartArr,
            setCartArr,
            wishList,
            setWishLIst,
            showNav,
            setShowNav,
            isloggedin,
            setIsloggedin,
          }}
        >
          {showNav && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/myaccount" element={<Myaccount />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </dataContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { dataContext };
