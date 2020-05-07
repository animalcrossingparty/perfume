import React from "react";
import { Header } from "../components";
import { Link } from "react-router-dom";
import "../css/SurveyPage.css";
import male from "assets/info/tomford.webp";
import female from "assets/female_perfume.jpg";
import unisex from "assets/info/atelie.webp";

function SurveyIntroPage() {
  return (
    <section style={{ backgroundColor: "#f9f9f9", minHeight: '90vh', overflowY: 'hidden' }}>
      <Header />
      <div className="container hdown ">
        <section className="imagelink-container">
          <Link
            to={{ pathname: "/expsurvey", state: 0 }}
            style={{ color: "black" }}
          >
            <div className="image-link-to-expsurvey" style={{backgroundImage: `url(${male})`}}>
              <p className="ilink-expand">Male</p></div>
          </Link>

          <Link to={{ pathname: "/expsurvey", state: 1 }}>
            <div className="image-link-to-expsurvey" style={{backgroundImage: `url(${female})`}}><p className="ilink-expand">Female</p></div>
          </Link>

          <Link
            to={{ pathname: "/expsurvey", state: 2 }}
            style={{ color: "black" }}
          >
            <div className="image-link-to-expsurvey" style={{backgroundImage: `url(${unisex})`}}><p className="ilink-expand">Unisex</p></div>
          </Link>
        </section>
      </div>
    </section>
  );
}

export default SurveyIntroPage;
