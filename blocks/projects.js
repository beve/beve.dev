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
              slug={project.node.slug}
              path={path}
              style={{
                gridRow: `${row} / span 2`,
                gridColumn: `${col} / span 5`,
              }}
            />
          );
        })}
      </Grid>
    </>
  );
}