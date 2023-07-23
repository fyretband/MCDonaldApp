import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../BannerCarousel.css";
import BurgerImage from "../assets/Burger1.png";
import Image from "../assets/Burger2.jpg";
import Burger from "../assets/Burger3.png";
import Footer from "./Footer";
import Header from "./Navbar";
const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imageStyle = {
    width: "80%", // Ubah ukuran gambar sesuai kebutuhan
    height: "auto",
    margin: "0 auto", // Tengahkan gambar secara horizontal
  };

  return (
    <>
      <Header />
      <Slider {...settings}>
        <div>
          <img style={imageStyle} src={BurgerImage} alt="Banner 1" />
        </div>
        <div>
          <img style={imageStyle} src={Image} alt="Banner 2" />
        </div>
        <div>
          <img style={imageStyle} src={Burger} alt="Banner 3" />
        </div>
      </Slider>
    </>
  );
};

export default BannerCarousel;
