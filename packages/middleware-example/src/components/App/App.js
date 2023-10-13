import * as React from "react";
import PropTypes from "prop-types";
import styles from "./App.scss";
import LinkGroup from "../LinkGroup";
import FetchGroup from "../FetchGroup";

const App = ({ images, URI }) => {
  const [src, setSrc] = React.useState(URI);

  return (
    <>
      <FetchGroup images={images} setSrc={setSrc} />
      <LinkGroup images={images} />
      {src ? <img className={styles.image} src={src} alt="" /> : null}
    </>
  );
};

App.propTypes = {
  images: PropTypes.array,
  URI: PropTypes.string,
};

export default App;
