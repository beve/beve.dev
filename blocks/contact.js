import React from "react";

import Grid from "../components/grid";
import Slider from "../components/slider";

export default () => {
  return (
    <>
      <Grid style={{ gridTemplateRows: "280px 1fr 190px" }} drawCols={14}>
        <div className="title">Contact</div>
        <div className="formCss">
          <input type="text" placeholder="Nom Prénom"></input>
          <input type="email" placeholder="Email"></input>
          <textarea placeholder="Message"></textarea>
        </div>
        <div className="submit">
          <Slider />
        </div>
      </Grid>
    </>
  );
};
