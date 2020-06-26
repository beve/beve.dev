import Grid from "../../components/grid";
import Down from "../../components/down";
import Close from "../../components/close";
import { initializeApollo } from '../../lib/apolloClient'
import { gql } from 'apollo-boost';

export default function ProjectPage({ data }) {
  /*
  const {
    name,
    images,
    stack,
    customer,
    technologies,
    context,
    description,
  } = data;
  */

  // console.log(data);

  return (
    <>
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
        {/* 
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
          <div>{name}</div>
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
        <div data-cursor="big" className="iconClose">
          <div>
            <Close />
          </div>
        </div>
        <div className="iconDown" data-cursor="big">
          <Down />
        </div>
          */}
      </Grid>
      <style jsx>
        {`
          .sheet div {
            font-size: 3em;
            font-weight: bold;
            line-height: 1.25em;
          }
        `}
      </style>
    </>
  );
}

export async function getStaticPaths() {

  const query = gql`
  {
    projects(where: {status: PUBLISH}) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `

  const apolloClient = initializeApollo()

  var result = await apolloClient.query({
    query,
    variables: {},
  })

  const paths = [];
  result.data.projects.edges.forEach(edge => {
    paths.push({params: { slug: edge.node.slug}})
  });

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const query = gql`
  {
    projects(where: {search: "${params.slug}"}) {
      edges {
        node {
          slug
          title(format: RAW)
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
    variables: {},
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data: result.data.projects.edges[0].node
    },
    unstable_revalidate: 1,
  }
}