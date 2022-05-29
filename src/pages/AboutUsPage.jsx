import React, { useState } from "react";
import BackgroundVideo from "../assets/videos/slow.mp4";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className={"about-us-wrapper"}>
      <motion.div
        initial={{ filter: "brightness(50%)" }}
        animate={videoEnded ? { filter: "brightness(40%)" } : {}}
        className="video-wrapper"
      >
        <video
          autoPlay={true}
          width="100%"
          height="100%"
          preload="auto"
          muted
          onEnded={() => setVideoEnded(true)}
        >
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div className="about-us-info-wrapper">
        <div className="about-us-header">
          <h1>About us</h1>
        </div>
        <div className="about-us-text">
          <p>
            Sk8finity Skateshop is brought to you by knowledgeable and dedicated
            people who can handle all your skateboarding needs. We try our best
            to infinitely better serve our customers and bring you the infinite
            selection of skateboard accessories.
          </p>
          <p>
            We are based in the heart of the skateboarding industry - Los
            Angeles, California.
            <br />
          </p>
          <h2>Why you can trust us?</h2>
          <p>
            We are skaters at heart. We love to skate and have been shredding
            our whole lives. We are passionate about the products you can find
            in our shop and sell only the infinitely best stuff that is out
            there.
          </p>
          <h2>Contact</h2>
          <p>☎️ &nbsp;&nbsp;+99 123 456 789</p>
          <p>📧 &nbsp;&nbsp;&nbsp;&nbsp;support@sk8finityskateshop.com</p>
          <p>📍🗺️ &nbsp;Maple Ave, Los Angeles, California</p>
          <p>
            🕒 &nbsp;&nbsp;&nbsp;&nbsp;Open Monday through Friday 10am : 8pm
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
