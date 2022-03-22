import React from "react";
import "../styles/Hero.css";
import { useHistory } from "react-router-dom";
import Header from "./Header";

const Hero = () => {
  const history = useHistory();

  const goExplore = () => {
    history.push("/explore");
  };
  const goCreate = () => {
    history.push("/create");
  };

  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}

      <Header />

      <h1 id="header-text-first"> NFT </h1>
      <h1 id="header-text-second"> Minion Marketplace</h1>
      <h5 id="header-subtext">Craft, hunt and trade NFT's in the dark</h5>

      <div id="hero-buttons">
        <button id="explore" onClick={goExplore}>
          Explore
        </button>
        <button id="create" onClick={goCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Hero;
