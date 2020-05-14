import React from "react";

import Grid from "../components/grid";
import HomeProject from "../components/homeProject";

export default function Projects({ data }) {
  return (
    <Grid gridCss={{ gridTemplateRows: "repeat(6, 1fr)" }} drawCols={14}>
      <div className="title">Projets</div>
      {/*data.allDatoCmsProject.edges.map((project, i) => {
        const row = [1, 2, 4, 5][i % 4];
        const col = [8, 3][i % 2];
        const path = `/projet/${project.node.name
          .replace(" ", "-")
          .toLowerCase()}`;
        return (
          <HomeProject
            key={project.node.id}
            name={project.node.name}
            illustration={project.node.illustration.fluid}
            logo={project.node.logo.fluid}
            id={project.node.id}
            path={path}
            customCss={{
              gridRow: `${row} / span 2`,
              gridColumn: `${col} / span 5`,
            }}
          />
        );
      })*/}
    </Grid>
  );
}

/*
export default (props) => {
  return (
    <StaticQuery
      query={graphql`
        query Projects {
          allDatoCmsProject(
            filter: {
              locale: { eq: "fr" }
              meta: { status: { eq: "published" } }
            },
            sort: {fields: order, order: ASC}
          ) {
            edges {
              node {
                id
                name
                illustration {
                  fluid {
                    ...GatsbyDatoCmsFluid
                  }
                }
                logo {
                  fluid {
                    ...GatsbyDatoCmsFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => <Projects data={data} {...props} />}
    />
  )
}
*/
