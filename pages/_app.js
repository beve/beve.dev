import Link from "next/link";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apolloClient";
import { TransitionGroup } from "react-transition-group";
import Beve from "../components/beve";
import Menu from "../components/menu";
import Grid from "../components/grid";
import Cursor from "../components/cursor";
import ContactInfos from "../components/contactInfos";
import theme from "../theme";

export default function App({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Cursor />
      <div>
        <Grid className="topGrid">
          <Link href="/p/[slug]" as="/p/arkeogis" scroll={false}>
            <a data-cursor="big">
              <Beve />
            </a>
          </Link>
          <Menu />
        </Grid>
        <main className="mainGrid">
          <TransitionGroup component={null}>
            <Component key={router.pathname} {...pageProps} />
          </TransitionGroup>
        </main>
        <Grid className="bottomGrid">
          <ContactInfos />
        </Grid>
      </div>
      <style jsx global>
        {`
          body,
          html {
            font-family: ${theme.fontFamily};
            color: #343434;
            padding: 0;
            margin: 0;
          }
          a {
            text-decoration: none;
            color: #343434;
            cursor: none;
          }

          @font-face {
            font-family: "Open Sans";
            src: url("/fonts/OpenSans-Light.woff2") format("woff2"),
              url("/fonts/OpenSans-Light.woff") format("woff");
            font-weight: 300;
            font-style: normal;
          }

          @font-face {
            font-family: "Open Sans";
            src: url("/fonts/OpenSans-Bold.woff2") format("woff2"),
              url("/fonts/OpenSans-Bold.woff") format("woff");
            font-weight: bold;
            font-style: normal;
          }

          @font-face {
            font-family: "Open Sans";
            src: url("/fonts/OpenSans-Regular.woff2") format("woff2"),
              url("/fonts/OpenSans-Regular.woff") format("woff");
            font-weight: normal;
            font-style: normal;
          }

          @font-face {
            font-family: "Open Sans";
            src: url("/fonts/OpenSans-SemiBold.woff2") format("woff2"),
              url("/fonts/OpenSans-SemiBold.woff") format("woff");
            font-weight: 600;
            font-style: normal;
          }

          .topGrid {
            position: fixed;
            z-index: 10;
            grid-template-columns: repeat(7, 1fr);
            width: 100vw;
            max-width: 1440px;
            transform: translateX(0);
            grid-template-areas: "logo ... ... menu menu menu menu";
          }

          .bottomGrid {
            position: fixed;
            z-index: 10;
            bottom: 0;
            grid-template-columns: repeat(7, 1fr);
            width: 100vw;
            max-width: 1440px;
            transform: translateX(0);
            grid-template-areas: "infos . . . . . .";
            pointer-events: none;
          }

          @media screen and (min-width: 1440px) {
            .bottomGrid {
              left: 50%;
              transform: translateX(calc(-50%));
            }
            .topGrid {
              left: 50%;
              transform: translateX(calc(-50%));
            }
          }
        `}
      </style>
      <style jsx>
        {`
          .mainGrid {
            position: relative;
            margin: 0 auto;
            min-height: calc(100vh - 140px);
            width: 100vw;
            max-width: 1440px;
            overflow: hidden;
          }
        `}
      </style>
    </ApolloProvider>
  );
}
