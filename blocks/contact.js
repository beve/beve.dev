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
        <div clasName="submit">
          <Slider />
        </div>
      </Grid>
      <style jsx>
        {`
          .formCss {
            display: flex;
            grid-area: 2 / 3 / span 1 / span 10;
            flex-flow: row wrap;
          }
          input,
          textarea {
            box-sizing: border-box;
            border: none;
            background-color: #ebebeb;
            font-size: 22px;
            font-size: 1.4em;
            font-family: Open Sans;
            font-weight: 300;
            padding: 20px 30px 24px 30px;
          }
          input:focus,
          textarea:focus {
            transition: all 0.3s;
            background-color: #333;
            color: #fff;
          }
          input[type="text"] {
            flex: 0 0 50%;
          }
          input[type="email"] {
            flex: 0 0 50%;
          }
          textarea {
            margin-top: 60px;
            height: 10em;
            flex: 0 0 100%;
          }

          .title {
            grid-row: 1;
            grid-column: 7 / span 2;
            justify-self: center;
            align-self: end;
            font-size: 3.5em;
            line-height: 2.85em;
            letter-spacing: 1px;
            font-weight: 700;
          }

          .submit {
            grid-row: 3;
            grid-column: 4 / span 8;
            width: 100%;
            align-self: center;
            justify-self: center;
          }
        `}
      </style>
    </>
  );
};
