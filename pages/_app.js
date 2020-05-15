import Beve from "../components/beve";
import Menu from "../components/menu";
import Grid from "../components/grid";
import Cursor from "../components/cursor";
import ContactInfos from "../components/contactInfos";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Cursor />
      <div>
        <Grid className="topGrid">
          <Beve />
          <Menu />
        </Grid>
        <Grid className="mainGrid">
          <main className="main">
            <Component {...pageProps} />;
          </main>
        </Grid>
        <Grid className="bottomGrid">
          <ContactInfos />
        </Grid>
      </div>
    </>
  );
}
