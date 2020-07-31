import React, { useEffect } from "react";
import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import { gql } from "apollo-boost";
import gsap from "gsap";
import DrawSVG from "gsap/DrawSVGPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(DrawSVG);
gsap.registerPlugin(ScrollTrigger);

import Landing from "../blocks/landing";
import Skills from "../blocks/skills";
import Customers from "../blocks/customers";
import Projects from "../blocks/projects";
import Contact from "../blocks/contact";

const IndexPage = ({ projects }) => {

  useEffect(() => {
    // Gauges
    gsap.utils.toArray(".gauge").forEach((gauge) => {
      const value = gauge.getAttribute("data-value");
      const text = gauge.querySelector("text");
      const circle = gauge.querySelector("circle");
      gsap.set(circle, { drawSVG: 0 });
      gsap.to(
        circle,
        {
          duration: 1,
          drawSVG: `${value}%`,
          scrollTrigger: { 
            trigger: circle,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
            once: true,
          },
          onUpdate: function () {
            const computed = gsap.utils.interpolate(0, value, this.progress());
            text.textContent = Math.round(computed);
          },
        },
        "<"
      );
    });
    // Bars
    gsap.utils.toArray(".bar").forEach((bar) => {
      const value = bar.getAttribute("data-value");
      const text = bar.querySelector(".text1 textPath");
      const path = bar.querySelector(".pathAnimated")
      gsap.set(path, { drawSVG: 0 });
      gsap.to(
        path,
        {
          duration: 1,
          drawSVG: `${value}%`,
          scrollTrigger: { 
            trigger: path,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
            once: true,
          },
          onUpdate: function () {
            const computed = gsap.utils.interpolate(0, value, this.progress());
            text.textContent = Math.round(computed);
          },
        },
        "<"
      );
    });
  }, []);

  return (
    <div className="indexPage">
      <Head>
        <meta title="Accueil" />
      </Head>
      <Landing />
      <Skills />
      <Projects data={projects} />
      <Customers />
      <Contact />
    </div>
  );
};

export async function getStaticProps() {
  const query = gql`
    {
      projects(where: { status: PUBLISH }) {
        edges {
          node {
            id
            slug
            title
            acf {
              context
              customer
              position
              stack
              technologies
              url
              illustration {
                sourceUrl(size: LARGE)
              }
              logo {
                sourceUrl(size: LARGE)
              }
            }
          }
        }
      }
    }
  `;

  const apolloClient = initializeApollo();

  var result = await apolloClient.query({
    query,
    variables: { skip: 0, first: 6 },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      projects: result.data.projects.edges,
    },
    revalidate: 1,
  };
}

export default IndexPage;
