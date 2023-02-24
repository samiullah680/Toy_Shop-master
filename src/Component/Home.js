import React, { useContext, useEffect } from "react";
import "./CSS/Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import Toy from "../DataFile/Toy";
import cate from "../DataFile/category";
import age from "../DataFile/Age";
import Footer from "./Footer";
import { dataContext } from "../App";

const Home = () => {
  const search = useContext(dataContext);
  const nav = useNavigate();
  const settings = {
    infinite: true,
    dots: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const settings2 = {
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          centerMode: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          centerMode: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          centerMode: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  const srchcate = (e) => {
    let txt = e.target.id.toLowerCase();
    let arr = [];
    Toy.forEach((val) => {
      if (val.category.toLowerCase() === txt) {
        arr.push(val);
      }
    });
    search.setProArr(arr);
    nav("/product");
  };

  const searchAge = (e) => {
    let arr = [];
    Toy.forEach((obj) => {
      if (obj.age === e) {
        arr.push(obj);
      }
    });
    search.setProArr(arr);
    nav("/product");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="home_div1">
        <Slider {...settings}>
          <div className="slide1">
            <div className="slide2btn_div">
              <Link to="/product">
                <button className="slide2btn">Shop Now</button>
              </Link>
            </div>
          </div>
          <div className="slide2"></div>
        </Slider>
      </div>
      <div>
        <h3 className="catehead">Shop by Category</h3>
        <div className="home_div2">
          {cate.map((val) => {
            return (
              <>
                <div onClick={srchcate} id={val.name} className="cards">
                  <div className="imgcat">
                    <img
                      onClick={srchcate}
                      id={val.name}
                      className="cate_img"
                      src={val.image}
                      alt=""
                    />
                  </div>
                  <h2 onClick={srchcate} id={val.name} className="headcat">
                    {val.name}
                  </h2>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="home_div3">
        <h3 className="catehead2" style={{ paddingTop: "10px" }}>
          Shop By Age
        </h3>
        <Slider {...settings2}>
          {age.map((val) => {
            return (
              <div className="ageSlideImg">
                <img
                  onClick={() => {
                    searchAge(val.age);
                  }}
                  style={{
                    width: "80%",
                    cursor: "pointer",
                    paddingBottom: "10px",
                  }}
                  src={val.image}
                  alt=""
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div id="about-div">
        <h1 style={{ textAlign: "center" }}>ABOUT US</h1>
        <div className="row-1">
          <div className="img-1">
            <img
              src="https://hmadmin.hostx1.de/cms_images/1620133731From-India-to-the-world.jpg"
              alt="sdf"
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: "55px",
                borderBottomRightRadius: "55px",
              }}
            />
          </div>
          <div className="content-1">
            <p>
              The Indian chapter of the Kids Playground story is quite amazing.
              With 100+ stores in 36 cities, and many more in the making, Kids
              Playground has become the most loved toyshop in India. Today, you
              can go online, walk into a mall, or an airport, and enjoy the
              trademark Kids Playground experience.
            </p>
          </div>
        </div>
        <div className="row-2">
          <div className="content-2">
            <p>
              The Indian chapter of the Kids Playground story is quite amazing.
              With 100+ stores in 36 cities, and many more in the making, Kids
              Playground has become the most loved toyshop in India. Today, you
              can go online, walk into a mall, or an airport, and enjoy the
              trademark Hamleys experience.
            </p>
          </div>
          <div className="img-2">
            <img
              src="https://hmadmin.hostx1.de/cms_images/1620133789Spreading-the-joy.jpg"
              alt="asdf"
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: "55px",
                borderBottomRightRadius: "55px",
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
