import React, { useState } from "react";
import BackgroundVideo from "../assets/videos/walk.mp4";
import BackgroundImage from "../assets/homepage-background.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleNavigate = (route) => {
    navigate(route);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className={"home-wrapper"}>
      <div className="background-wrapper">
        {!videoLoaded && (
          <motion.img
            initial={{ filter: "brightness(90%)" }}
            animate={{
              filter: "brightness(65%)",
              scale: 0.995,
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              },
            }}
            src={BackgroundImage}
            alt=""
          />
        )}
      </div>
      <div className="video-wrapper">
        <video
          onLoadedData={() => setVideoLoaded(true)}
          loop={true}
          autoPlay={true}
          playsInline={true}
          width="100%"
          height="100%"
          preload="auto"
          muted
        >
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
      </div>
      <div
        className={`welcome-wrapper ${
          videoLoaded ? "light-text" : "dark-text"
        }`}
      >
        <div className="text-wrapper">
          <h1>Skate</h1>
        </div>
        <div className="text-wrapper">
          <h2>beyond</h2>
        </div>
        <div className="text-wrapper">
          <h2>infinity</h2>
        </div>
      </div>
      <button
        className="explore-wrapper"
        onClick={() => handleNavigate("/products")}
      >
        <span>explore our shop</span>
      </button>
    </div>
  );
};

export default HomePage;
