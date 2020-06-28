import Grid from "../../components/grid";
import Down from "../../components/down";
import Close from "../../components/close";
import { initializeApollo } from "../../lib/apolloClient";
import { gql } from "apollo-boost";

export default function ProjectPage({ data }) {
  const { title, slug, acf } = data;

  const {
    context,
    customer,
    description,
    illustration,
    logo,
    images,
    position,
    stack,
    technologies,
    url,
  } = acf;

  return (
    <>
      <div className="project">
        <Grid
          style={{
            height: `100vh`,
          }}
          drawCols={14}
          colsCss={{
            zIndex: 1,
            opacity: 0.3,
            height: "100vh",
          }}
        >
          <div className="illustrations">
            <div className="slider">
              {images.map((image) => {
                return (
                  <img
                    key={title}
                    src={image.sourceUrl}
                    alt={title}
                    title={title}
                  />
                );
              })}
            </div>
          </div>
          <div className="sheet">
            <div className="title">{title}</div>
            <div className="infos">
              <div>
                <span>Contexte:</span>
                {context}
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
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
          <div className="iconClose">
            <Close />
          </div>
          <div className="iconDown">
            <Down />
          </div>
        </Grid>
      </div>
      <style jsx>
        {`
          .project {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            max-width: 1440px;
            left: 50%;
            transform: translate(-50%, 0);

            .illustrations {
              grid-row: 1;
              grid-column: 1 / span 7;
              .slider {
                max-width: 100%;
                img {
                  height: 100vh;
                  max-width: 100%;
                  object-fit: cover;
                  object-position: left 50%;
                }
              }
            }

            .sheet {
              grid-row: 1;
              grid-column: 9 / span 6;
              padding-top: 220px;
              font-weight: 300;
              overflow-y: auto;
              scrollbar-width: none;
              padding-right: 50px;
              -ms-overflow-style: none;
              &::-webkit-scrollbar {
                display: none;
              }
              .title {
                font-weight: bold;
                font-size: 3.5em;
                line-height: 1.25em;
              }
              .infos {
                display: grid;
                grid-template-rows: 1fr 1fr;
                grid-template-columns: 1fr 1fr;
                grid-gap: 8px;
                margin: 30px 0 40px 0;
                span {
                  font-weight: 600;
                  letter-spacing: 0.5px;
                  padding-right: 5px;
                }
              }
              .content {
                font-size: 1.1em;
                line-height: 1.5em;
              }
            }
            .iconClose {
              grid-row: 1;
              grid-column: 14;
              align-self: start;
              margin-top: 180px;
              justify-self: center;
              width: 40px;
            }
            .iconDown {
              grid-row: 1;
              grid-column: 8;
              width: 15px;
              align-self: end;
              justify-self: center;
              margin-bottom: 30px;
            }
          }
        `}
      </style>
    </>
  );
}

export async function getStaticPaths() {
  const query = gql`
    {
      projects(where: { status: PUBLISH }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `;

  const apolloClient = initializeApollo();

  var result = await apolloClient.query({
    query,
    variables: {},
  });

  const paths = [];
  result.data.projects.edges.forEach((edge) => {
    paths.push({ params: { slug: edge.node.slug } });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const query = gql`
  {
    projects(where: {search: "${params.slug.replace("-", " ")}"}) {
      edges {
        node {
          slug
          title
          acf {
            description
            context
            customer
            position
            stack
            technologies
            url
            images {
              sourceUrl(size: LARGE)
            }
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
    variables: {},
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data: result.data.projects.edges[0].node,
    },
    unstable_revalidate: 1,
  };
}
