import Head from "next/head";

import Landing from "../blocks/landing";
import Skills from "../blocks/skills";
import Customers from "../blocks/customers";
import Projects from "../blocks/projects";
import Contact from "../blocks/contact";

const IndexPage = () => (
  <>
    <Head>
      <meta title="Accueil" />
    </Head>
    <Landing />
    <Skills />
    <Projects />
    {/* <Customers /> */}
    <Contact />
  </>
);

export default IndexPage;
