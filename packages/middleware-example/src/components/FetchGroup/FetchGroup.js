/* eslint-disable no-undef */
import * as React from "react";
import PropTypes from "prop-types";
import requester from "@sitevision/api/client/requester";
import router from "@sitevision/api/common/router";

const FetchGroup = ({ images, setSrc }) => {
  const fetchImage = (id) => {
    requester
      .doGet({
        url: router.getStandaloneUrl("/image"),
        data: { image: id },
      })
      .then(({ URI }) => {
        setSrc(URI);
      })
      .catch(({ status }) => {
        if (status === 401) {
          alert("Please log in to fetch image");
        } else {
          alert("ERROR");
        }
      });
  };

  return (
    <div className="env-flex env-flex--align-items-center env-p-around--medium">
      <div className="env-m-right--small">Fetch image:</div>
      <div className="env-button-group" role="group">
        {images.map((id, i) => (
          <button
            key={i}
            type="button"
            className="env-button"
            onClick={() => fetchImage(id)}
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  );
};

FetchGroup.propTypes = {
  images: PropTypes.array,
  setSrc: PropTypes.func,
};

export default FetchGroup;
