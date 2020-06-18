import React from "react";

import Grid from "../components/grid";
import HomeProject from "../components/homeProject";

export default function Projects({ data }) {
  return (
    <>
      <Grid style={{ gridTemplateRows: "repeat(8, 250px)" }} drawCols={14}>
        <div className="title">Projets</div>
        {data.map((project, i) => {
          const row = [2, 3, 5, 6][i % 4];
          const col = [8, 3][i % 2];
          const path = `/p/${project.node.slug}`;
          return (
            <HomeProject
              key={project.node.id}
              name={project.node.title}
              illustration={project.node.acf.illustration.sourceUrl}
              logo={project.node.acf.logo.sourceUrl}
              id={project.node.id}
              path={path}
              style={{
                gridRow: `${row} / span 2`,
                gridColumn: `${col} / span 5`,
              }}
            />
          );
        })}
      </Grid>
      <style jsx>
        {`
          .title {
            grid-row: 2;
            grid-column: 2 / -1;
            font-size: 3.5em;
            letter-spacing: 1px;
            align-self: center;
            margin-bottom: 20px;
            font-weight: 700;
          }
          
          .illustrations {
            grid-row: 1 / -1;
            grid-column: 1 / span 7;
          }

          .sheet {
            grid-row: 2;
            grid-column: 9 / span 5;
          }

          .infos {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 60px;
            font-weight: 300;
          }

          .infos > div {
            line-height: 1.7em;
            margin-top: 30px;
            flex: 1 1 50%;
          }

          .infos > div span {
            padding-right: 0.3em;
            font-weight: 600;
          }

          .infos > div :nth-of-type(odd) {
            flex: 1 1 calc(50% - 1em);
            padding-right: 1em;
          }

          .content {
            z-index: 1;
            grid-row: 3;
            grid-column: 9 / span 5;
            overflow-y: scroll;
            -ms-overflow-style: none;
            margin-bottom: 70px;
            scrollbar-width: none;
            font-size: 1.1em;
            letter-spacing: 0.5px;
            font-weight: 300;
            line-height: 1.5em;
          }

          .content::-webkit-scrollbar {
            display: none;
          }

          .iconClose {
            z-index: 1;
            box-sizing: border-box;
            grid-row: 2;
            grid-column: 14;
            width: 40px;
            height: 40px;
            align-self: start;
            justify-self: end;
            padding: 20px;
            margin-top: -67px;
            margin-right: 7px;
          }

          .iconDown {
            z-index: 1;
            grid-row: 3;
            grid-column: 8;
            box-sizing: border-box;
            justify-self: center;
            align-self: end;
            width: 40px;
            height: 40px;
            margin-bottom: 55px;
            padding: 12px;
          }
        `}
      </style>
    </>
  );
}