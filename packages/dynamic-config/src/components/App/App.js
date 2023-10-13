import * as React from "react";
import PropTypes from "prop-types";
import styles from "./App.scss";

const App = ({ links }) => {
  return (
    <div className="env-cardholder-grid">
      {links.map(({ text, link, image }, i) => (
        <a
          href={link}
          key={i}
          className={`${styles.link} env-card env-block env-shadow`}
        >
          <img src={image} alt="" aria-hidden className={styles.image} />
          <div className={styles.centered}>{text}</div>
        </a>
      ))}
    </div>
  );
};

App.propTypes = {
  links: PropTypes.array,
};

export default App;
