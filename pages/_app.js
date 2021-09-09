import Link from "next/link";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apolloClient";
import { TransitionGroup } from "react-transition-group";
import Beve from "../components/beve";
import Menu from "../components/menu";
import Grid from "../components/grid";
import Cursor from "../components/cursor";
import ContactInfos from "../components/contactInfos";
import "../sass/styles.scss";

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
    </ApolloProvider>
  );
}
