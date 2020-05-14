import React from "react";
import Grid from "../components/grid";

export default function Customers({ data }) {
  return (
    <Grid
      gridCss={{ gridTemplateRows: "380px 160px 160px 190px" }}
      drawCols={14}
    >
      <div css={title}>Clients</div>
      {data.allFile.edges.map((image) => {
        const [_, row, col] = image.node.name.match(
          /^[0-9]{2}-([0-9]+)-([0-9]+).*/
        ); // eslint-disable-line
        return (
          <div
            key={`${row}-${col}`}
            style={{
              maxWidth: `100%`,
              width: `90%`,
              gridRow: `${row}`,
              gridColumn: `${col} / span 2`,
              alignSelf: `center`,
              justifySelf: `center`,
            }}
          >
            <img
              fluid={image.node.childImageSharp.fluid}
              loading="eager"
              style={{ maxHeight: "80px" }}
              imgStyle={{ objectFit: "contain" }}
              alt="Logo"
            />
          </div>
        );
      })}
    </Grid>
  );
}

/*
export default (props) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allFile(
            sort: { fields: name }
            filter: { relativePath: { regex: "/logos/" } }
          ) {
            edges {
              node {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
                name
              }
            }
          }
        }
      `}
      render={(data) => <Customers data={data} {...props} />}
    />
  );
};
*/
