import Grid from "../components/grid";
import AnimationButton from "../components/animationButton";
import styles from "./landing.module.scss"

export default () => {
  return (
    <>
      <Grid style={{ overflow: "hidden", minHeight: "100vh" }} drawCols={14}>
        <div className={`caption ${styles.caption}`}>
          <div>Make dev.</div>
          <span>great again&nbsp;!</span>
        </div>
        <div className={`animationButton ${styles.animationButton}`}>
          <AnimationButton />
        </div>
        <div className={`desc ${styles.desc}`}>
          <div>
            Hello, je m'appelle <span>Christophe Beveraggi</span>
          </div>
          <div>
            Je suis développeur depuis 20 ans, concepteur d'objet amusants, et
            maker.
          </div>
        </div>
      </Grid>
    </>
  );
};
