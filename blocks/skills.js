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
    </>
  );
};

export default Skills;
