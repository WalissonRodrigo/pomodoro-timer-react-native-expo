import React, { memo } from "react";
import PropTypes from "prop-types";
import StyledText from "./StyledText";
import connectToContext from "../context";
import { toHHMMSS } from "../utils";

const DisplayTime = memo(({ time }) => (
  <StyledText large>{toHHMMSS(time)}</StyledText>
));

DisplayTime.propTypes = {
  time: PropTypes.number.isRequired,
};

export default connectToContext(DisplayTime, ["time"]);
