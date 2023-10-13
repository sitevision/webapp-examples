import * as React from "react";
import PropTypes from "prop-types";

const LinkGroup = ({ images }) => {
  return (
    <div className="env-flex env-flex--align-items-center env-p-around--medium">
      <div className="env-m-right--small">Link to image:</div>
      <div className="env-button-group" role="group">
        {images.map((id, i) => (
          <a href={`?image=${id}`} key={i} type="button" className="env-button">
            {id}
          </a>
        ))}
      </div>
    </div>
  );
};

LinkGroup.propTypes = {
  images: PropTypes.array,
};

export default LinkGroup;
