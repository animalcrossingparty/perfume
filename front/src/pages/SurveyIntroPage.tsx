import React from "react";
import { Header } from "../components";
import { Link } from "react-router-dom";
import "../css/SurveyPage.css";
import male from "assets/male_perfume.jpg";
import female from "assets/female_perfume.jpg";
import unisex from "assets/unisex_perfume.jpg";

function SurveyIntroPage() {
  return (
    <section style={{ backgroundColor: "#f9f9f9", minHeight: '100vh' }}>
      <Header />
      <div className="container hdown ">
        <section className="imagelink-container">
          <Link
            to={{ pathname: "/expsurvey", state: 0 }}
            style={{ color: "black" }}
          >
            <div className="image-link-to-expsurvey" style={{backgroundImage: `url(${male})`}}>Male</div>
          </Link>

          <Link to={{ pathname: "/expsurvey", state: 1 }}>
            <div className="image-link-to-expsurvey" style={{backgroundImage: `url(${female})`}}>Female</div>
          </Link>

          <Link
            to={{ pathname: "/expsurvey", state: 2 }}
            style={{ color: "black" }}
          >
            <div className="image-link-to-expsurvey" style={{backgroundImage: `url(${unisex})`}}>Unisex</div>
          </Link>
        </section>
      </div>
    </section>
  );
}

export default SurveyIntroPage;
