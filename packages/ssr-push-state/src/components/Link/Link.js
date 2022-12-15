import * as React from "react";
import PropTypes from "prop-types";
import router from "@sitevision/api/common/router";

const Link = ({ to, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    router.navigate(e.target.href);
  };
  return (
    <a href={router.getUrl(to)} onClick={handleClick}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
