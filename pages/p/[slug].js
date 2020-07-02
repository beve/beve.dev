import React from 'react'
import Link from "next/link"
import { gql } from "apollo-boost";
import { Transition } from 'react-transition-group'
import gsap from "gsap"
import Grid from "../../components/grid";
import Down from "../../components/down";
import Close from "../../components/close";
import { initializeApollo } from "../../lib/apolloClient";
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
    const rects = node.getElementsByTagName('rect')
    const sheetMask = node.querySelector('.sheetMask')
    const illustrations = node.querySelector('.illustrations')
    const illustrationsMask = node.querySelector('.illustrationsMask')
    const cols = node.querySelectorAll('.cols')
    const sheet = node.querySelector('.sheet')
    const iconClose = node.querySelector('.iconClose')
    const iconDown = node.querySelector('.iconDown')
    const beve = document.querySelector('.beve')
    const indexPage = document.querySelector('.indexPage')
    const tl = gsap.timeline()
    const c = [].slice.call(cols);
    gsap.set(sheet, { opacity: 0 })
    gsap.set(iconClose, { opacity: 0})
    gsap.set(iconDown, { opacity: 0})
    tl.to(illustrationsMask, { y: 0, duration: 0.4 })
    tl.to(sheetMask, { y: 0, duration: 0.4 }, '-=0.3')
    tl.set(indexPage, { opacity: 0 })
    tl.to(c.slice(0, 7), { stagger: 0.07, y: 0, borderColor: '#ebebeb', duration: 0.3, ease: 'ease.out' }, '-=0.5')
    tl.add('cols')
    tl.to(c.slice(7, 14), { borderColor: '#ccc', duration: 0.3 })
    tl.to(sheet, { opacity: 1, duration: 0 }, 'cols')
    tl.to(illustrations, { zIndex: 4, duration: 0 }, 'cols');
    tl.fromTo(rects, { y: '100vh' }, { stagger: 0.15, y: 0, duration: 1.8, ease: 'ease.out' }, 'cols-=1.4')
    tl.to(sheetMask, { x: '-100%', duration: 0.3, ease: 'ease.out' }, '-=0.4')
    tl.to(iconClose, {opacity: 1, duration: 0.4}, '-=0.2');
    tl.to(iconDown, {opacity: 1, duration: 0.4}, '<');
  }

  const exitHandle = (node) => {
    const sheetMask = node.querySelector('.sheetMask')
    const illustrations = node.querySelector('.illustrations')
    const illustrationsMask = node.querySelector('.illustrationsMask')
    const sheet = node.querySelector('.sheet')
    const cols = node.querySelectorAll('.cols');
    const tl = gsap.timeline()
    const iconClose = node.querySelector('.iconClose');
    const iconDown = node.querySelector('.iconDown');
    const beve = document.querySelector('.beve')
    const indexPage = document.querySelector('.indexPage')
    tl.fromTo(illustrationsMask, { zIndex: 10, y: '100vh' }, { y: 0, ease: 'ease.out', duration: 0.4 })
    tl.fromTo(sheetMask, { zIndex: 10, x: 0, y: '100vh' }, { y: 0, ease: 'ease.out', duration: 0.4 }, '-=0.3')
    tl.set(indexPage, { opacity: 1 }, '-=0.2')
    tl.set(sheet, { opacity: 0 }, '-=0.2')
    tl.set(cols, {borderColor: 'transparent'}, '-=0.2')
    tl.set(illustrations, { opacity: 0 }, '-=0.2')
    tl.to(iconClose, {opacity: 0, duration: 0.4}, '-=0.2');
    tl.to(iconDown, {opacity: 0, duration: 0.4}, '-=0.2');
    tl.to(illustrationsMask, { y: '-100vh', ease: 'ease.in', duration: 0.4 }, '-=0.4');
    tl.to(sheetMask, { y: '-100vh', duration: 0.4 }, '-=0.3');
  }

  return (
    <>
      <Transition timeout={{ enter: 0, exit: 800 }} in={inProp} onEnter={enterHandle} onExit={exitHandle} unmountOnExit={true}>
        <div className="project">
          <Grid
            style={{
              height: `100vh`,
            }}
            drawCols={14}
            colsCss={{
              zIndex: 5,
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
            <Link href="/" scroll={false}>
              <a className="iconClose" data-cursor="big">
                <Close />
              </a>
            </Link>
            <div className="iconDown" data-cursor="big">
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
            z-index: 1;

            :global(.cols) {
              border-color: transparent;
            }

            .illustrationsMask {
              grid-row: 1;
              grid-column: 1 / span 7;
              background-color: ${theme.color.primary};
              transform: translateY(-100%);
              z-index: 3;
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
              z-index: 3;
              transform: translateY(-100%)
            }

            .sheet {
              grid-row: 1;
              grid-column: 9 / span 7;
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
              z-index: 1;
            }
            .iconDown {
              grid-row: 1;
              grid-column: 8;
              width: 15px;
              align-self: end;
              justify-self: center;
              margin-bottom: 30px;
              z-index: 1;
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
