import React, { Component } from "react";
import { Header } from "../components";
import "../css/InfoPage.css";

class InfoPage extends Component<{}> {
  render() {
    return (
      <section style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <Header />
      </section>
    );
  }
}

export default InfoPage;
