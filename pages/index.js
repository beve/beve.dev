import Head from "next/head";

import Landing from "../blocks/landing";
import Skills from "../blocks/skills";
import Customers from "../blocks/customers";
import Projects from "../blocks/projects";
import Contact from "../blocks/contact";
import { initializeApollo } from '../lib/apolloClient'
import { gql } from 'apollo-boost';
import { Transition } from "react-transition-group"
import gsap from "gsap/gsap-core";

const enterHandle = (node) => {
  gsap.set(node, { pointerEvents: 'all' })
  gsap.set(node, { opacity: 1 })
}

const exitHandle = (node) => {
  gsap.set(node, { pointerEvents: 'none' })
  gsap.to(node, { opacity: 0, duration: 0, delay: 1 })
}

const IndexPage = ({ in: inProp, projects }) => {
  return (
    <Transition timeout={{ enter: 0, exit: 1000 }} in={inProp} onEnter={enterHandle} onExit={exitHandle}>
      <div>
        <Head>
          <meta title="Accueil" />
        </Head>
        <Landing />
        <Skills />
        <Projects data={projects} />
        <Customers />
        <Contact />
      </div>
    </Transition>
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
    variables: { skip: 0, first: 6 },
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