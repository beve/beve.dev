import Head from "next/head";

import Landing from "../blocks/landing";
import Skills from "../blocks/skills";
import Customers from "../blocks/customers";
import Projects from "../blocks/projects";
import Contact from "../blocks/contact";
import { initializeApollo } from '../lib/apolloClient'
import { gql } from 'apollo-boost';

const IndexPage = ({ projects }) => {
  return (
    <>
      <Head>
        <meta title="Accueil" />
      </Head>
      <Landing />
      <Skills />
      <Projects data={projects} />
      <Customers />
      <Contact />
    </>
  )
};

export async function getStaticProps() {

  const query = gql`
  {
    projects(where: {status: PUBLISH}) {
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
  `

  const apolloClient = initializeApollo()

  var result = await apolloClient.query({
    query,
    variables: { skip: 0, first: 10 },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      projects: result.data.projects.edges
    },
    unstable_revalidate: 1,
  }
}

export default IndexPage;