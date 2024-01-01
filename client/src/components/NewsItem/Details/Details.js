import React from "react";
import PropTypes from "prop-types";
import { summary, newsChannel, lastUpdate } from "../../../config/config";
import { details, text } from "./index";

function Details(props) {
  const { channel, published } = props;
  return (
    <div style={details}>
      <p style={text}>{newsChannel(channel)}</p>
      <p style={text}>{lastUpdate(published)}</p>
    </div>
  );
}

Details.propTypes = {
  channel: PropTypes.string,
  published: PropTypes.string,
};

export default Details;
