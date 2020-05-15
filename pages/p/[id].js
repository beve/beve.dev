import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { css } from "@emotion/core";

import SEO from "../components/seo";
import Grid from "../components/grid";
import Layout from "../components/layout";
import Down from "../components/down";
import Close from "../components/close";

export default function ProjectPage({ data }) {
  const {
    name,
    images,
    stack,
    customer,
    technologies,
    perimeter,
    description,
  } = data.allDatoCmsProject.edges[0].node;

  return (
    <Grid
      className="projects"
      style={{
        gridTemplateRows: `225px 260px 1fr`,
        height: `100vh`,
      }}
      drawCols={14}
      colsCss={{
        zIndex: 1,
        opacity: 0.3,
      }}
    >
      <div className="illustrations">
        {images.map((image) => {
          const { fluid, alt, title } = image;
          return (
            <Img
              key={title}
              fluid={fluid}
              alt={alt}
              title={title}
              style={{ height: "100%" }}
            />
          );
        })}
      </div>
      <div className="sheet">
        <div
          css={css`
            font-size: 3em;
            font-weight: bold;
            line-height: 1.25em;
          `}
        >
          {name}
        </div>
        <div className="infos">
          <div>
            <span>Contexte:</span>
            {perimeter}
          </div>
          <div>
            <span>Client:</span>
            {customer}
          </div>
          <div>
            <span>Stack:</span>
            {stack}
          </div>
          <div>
            <span>Technologies:</span>
            {technologies}
          </div>
        </div>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div data-cursor="big" css={iconClose}>
        <div>
          <Close />
        </div>
      </div>
      <div className="iconDown" data-cursor="big">
        <Down />
      </div>
    </Grid>
  );
}

/*
export const query = graphql`
  query ProjectQuery($id: String) {
    allDatoCmsProject(filter: {id: {eq: $id}, locale: {eq: "fr"}}) {
      edges {
        node {
          id
          name
          stack
          technologies
          customer
          description
          perimeter
          images {
            alt
            title
            fluid {
              aspectRatio
              height
              sizes
              src
              srcSet
              width
            }
          }
        }
      }
    }
  }
`
*/
