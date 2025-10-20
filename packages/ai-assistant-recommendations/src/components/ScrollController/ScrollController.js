import PropTypes from "prop-types";
import * as React from "react";
import styles from "./ScrollController.scss";

// Component that manages scrolling to the bottom of the responses list when new responses are being written.
const ScrollController = ({ responses }) => {
  const scrollControllerRef = React.useRef(null);

  React.useEffect(() => {
    scrollControllerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [responses]);

  return (
    <div
      aria-hidden
      className={styles.scrollController}
      ref={scrollControllerRef}
      /* Non visible element to manage scroll. */
    >
      &nbsp;
    </div>
  );
};

ScrollController.propTypes = {
  responses: PropTypes.array,
};

export default ScrollController;
