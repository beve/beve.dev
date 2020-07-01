import React from 'react'
import Grid from "../../components/grid";
import Down from "../../components/down";
import Close from "../../components/close";
import { initializeApollo } from "../../lib/apolloClient";
import { gql } from "apollo-boost";
import { Transition } from 'react-transition-group'
import gsap from "gsap"
import theme from "../../theme"

export default function ProjectPage({ data, in: inProp }) {

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

  const BANDS_NB = 3;
  const rects = new Array(BANDS_NB).fill();
  const bandWidth = 100 / (BANDS_NB + 0.5);

  const enterHandle = (node) => {
    const tl = gsap.timeline()
    const rects = node.getElementsByTagName('rect')
    const sheetMask = node.querySelector('.sheetMask')
    const illustrations = node.querySelector('.illustrations')
    const illustrationsMask = node.querySelector('.illustrationsMask')
    const cols = node.querySelectorAll('.cols');
    const sheet = node.querySelector('.sheet')
    tl.to(illustrationsMask, { y: 0, duration: 0.4 })
    tl.to(sheetMask, { x: 0, duration: 0.4 }, '-=0.3')
    tl.to(cols, { stagger: 0.1, y: 0, borderColor: '#ccc', duration: 0.8, ease: 'ease.out'}, '<')
    tl.to(rects, { stagger: 0.15, y: 0, opacity: 1, duration: 0.8, ease: 'ease.out' }, '<0.4')
    tl.to(sheet, { opacity: 1, duration: 0 }, '<')
    tl.to(illustrations, {zIndex: 10, duration: 0}, '<');
    tl.to(sheetMask, { x: '-100%', ease: 'ease.out', duration: 0.3 }, '<1.2')
  }

  const exitHandle = (node) => {
    // gsap.to(node, {opacity: 0}, 0.8)
    // console.log(node);
    // const rects = node.gjetElementsByTagName('rect');
    // gsap.to(rects, { stagger: 0.1, height: 0, duration: 1, ease: 'none' })
    // gsap.set(rects, { scaleY: 0})
    // gsap.to(rects, { scaleY: 0, duratioon: 1 })
    // gsap.to(node, {opacity: 0, duration: 1})
  }

  return (
    <>
      <Transition timeout={{ enter: 0, exit: 1000 }} in={inProp} onEnter={enterHandle} onExit={exitHandle} unmountOnExit={true}>
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
            className="projectGrid"
          >
            <div className="illustrationsMask"></div>
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
            <div className="sheetMask"></div>
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
          <svg viewBox="0 0 100 100" width="0" height="0">
            <defs>
              <clipPath id="bands" clipPathUnits="objectBoundingBox" transform="scale(0.01)">
                {
                  rects.map((_, i) => {
                    return (
                      <rect key={`rect_${slug}_${i}`} x={(i * bandWidth)} width={bandWidth} height="100" />
                    )
                  })}
                <rect key="rect_half" x={BANDS_NB * bandWidth} width={bandWidth / 2} height="100" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </Transition>
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

            :global(.cols) {
              border-color: transparent;
            }

            rect {
              transform: translateY(100vh)
            }

            .illustrationsMask {
              grid-row: 1;
              grid-column: 1 / span 7;
              background-color: ${theme.color.primary};
              border-right: 1px solid transparent;
              transform: translateY(-100%)
            }

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
              clip-path: url(#bands);
            }

            .sheetMask {
              grid-row: 1;
              grid-column: 8 / span 7;
              background-color: ${theme.color.primary};
              z-index: 1;
              transform: translateX(100vw)
            }

            .sheet {
              grid-row: 1;
              grid-column: 9 / span 7;
              opacity: 0;
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
              opacity: 0;
              grid-row: 1;
              grid-column: 14;
              align-self: start;
              margin-top: 180px;
              justify-self: center;
              width: 40px;
            }
            .iconDown {
              opacity: 0;
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
