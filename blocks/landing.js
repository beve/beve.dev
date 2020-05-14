import Grid from "../components/grid";
import AnimationButton from "../components/animationButton";

export default () => {
  return (
    <>
      <Grid style={{overflow: 'hidden', minHeight: '100vh'}} drawCols={14}>
        <div className="caption">
          <div>Make dev.</div>
          <span>great again&nbsp;!</span>
        </div>
        <div className="animationButton">
          <AnimationButton />
        </div>
        <div className="desc">
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