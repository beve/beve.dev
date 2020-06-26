import React from "react";

import Grid from "../components/grid";
import Gauge from "../components/gauge";
import Bar from "../components/bar";

const Skills = () => {

  const isMobile = false;

  return (
    <>
      <Grid
        style={{ gridTemplateRows: `490px 280px 280px 560px` }}
        drawCols={isMobile ? 7 : 14}
      >
        <div className="title">Compétences</div>
        <div
          className="label"
          style={isMobile ? {
            gridRow: `1`,
            gridColumn: `2 / span 2`,
            justifySelf: `center`,
            alignSelf: `end`,
          } : {
              gridRow: `1`,
              gridColumn: `3 / span 2`,
              justifySelf: `center`,
              alignSelf: `end`,
            }}
        >
          Frontend
        </div>
        <div
          className="label"
          style={{
            gridRow: `1`,
            gridColumn: `8 / span 2`,
            justifySelf: `center`,
            alignSelf: `top`,
            paddingTop: `190px`,
          }}
        >
          Backend
        </div>
        <Gauge
          style={{
            gridRow: `2`,
            gridColumn: `3 / span 2`,
            alignSelf: `center`,
          }}
          value={90}
          label="React"
        />
        <Gauge
          style={{
            gridRow: `2`,
            gridColumn: `5 / span 2`,
            alignSelf: `center`,
          }}
          value={70}
          label="Angular"
        />
        <Gauge
          style={{
            gridRow: `1`,
            gridColumn: `7 / span 2`,
            alignSelf: `end`,
            paddingBottom: `5px`,
          }}
          value={90}
          label="NodeJS"
        />
        <Gauge
          style={{
            gridRow: `1`,
            gridColumn: `9 / span 2`,
            alignSelf: `end`,
            paddingBottom: `5px`,
          }}
          value={70}
          label="Golang"
        />
        <Gauge
          style={{
            gridRow: `2`,
            gridColumn: `9 / span 2`,
            alignSelf: `center`,
          }}
          value={90}
          label="Php"
        />
        <Gauge
          style={{
            gridRow: `2`,
            gridColumn: `11 / span 2`,
            alignSelf: `center`,
          }}
          value={70}
          label="Admin système"
        />
        <Gauge
          style={{
            gridRow: `3`,
            gridColumn: `5 / span 2`,
          }}
          value={80}
          label="Vanilla JS"
        />
        <Gauge
          style={{
            gridRow: `3`,
            gridColumn: `7 / span 2`,
          }}
          value={70}
          label="Animations"
        />
        <div className="bars">
          <div style={{ maxWidth: `46%` }}>
            <div className="label">
              IOT
            </div>
            <Bar value={70} label="C++" />
            <Bar value={80} label="Arduino" />
            <Bar value={60} label="Conception" />
            <Bar value={60} label="Électronique" />
          </div>
          <div style={{ maxWidth: `46%` }}>
            <div className="label">
              & More
            </div>
            <Bar value={90} label="Impression 3D" />
            <Bar value={60} label="Usinage CNC" />
            <Bar value={90} label="Modélisme (drones, hélicos, FVP...)" />
            <Bar value={60} label="3D industrielle" />
          </div>
        </div>
      </Grid>
      <style jsx>
        {`
          .label {
            font-weight: bold;
            font-size: 1.9em;
          }
          .bars {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-flow: row wrap;
            grid-row: 4;
            grid-column: 3 / span 10;
            min-height: 560px;
            background-color: #fff;
            border: 1px solid #ececec;
            border-left: none;
            padding: 60px 60px 80px 60px;
          }
          .bars > div:first-of-type {
            flex: 1 1 50%;
          }
          .bars > div:last-of-type {
            flex: 1 1 50%;
          }
          .title {
            position: relative;
            grid-row: 1;
            grid-column: 2 / span 3;
            padding-top: 100px;
            align-self: start;
            font-size: 3.5em;
            letter-spacing: 1px;
            font-weight: 700;
            height: 140px; // Position of text "Clients" top, use grid template-row height for simulate margin top
          }
          .title > div {
            position: absolute;
            font-size: 3.5em;
            letter-spacing: 1px;
            font-weight: 700;
          }
        `}
      </style>
    </>
  );
};

export default Skills;
