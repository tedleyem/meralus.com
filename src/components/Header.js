import React from "react";
import NavBar from "./NavBar";
import meralus from "../assets/images/techdadteddy_cartoon_transparent-.png";

function Header() {
  return (
    <header>
      <NavBar />
      <div className="info space-x-2">
        <div className="info-1">
          <button>Linux Engineer</button>
          <br />
          <h1>An investment in knowledge
            <br /> pays the best interest.
          </h1>
          <br />
          <p className="gray">I develop and design web and linux based solutions, and I love what I do.</p>
          <br />
          <a href="https://twitter.com/techdadteddy">
          <button>Chat on Twitter</button>
          </a>

        </div>
        <div className="info-img">
          <img src={meralus} alt="" />
        </div>
      </div>
    </header>
  );
}

export default Header;
