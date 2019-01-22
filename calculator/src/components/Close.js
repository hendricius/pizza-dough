import React from "react";
import { Link } from "react-router-dom";

const Close = ({ color }) => {
  return (
    <Link to="/" className="close">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Back"
      >
        <path
          d="M12 9.6L2.4 0L0 2.4L9.6 12L0 21.6L2.4 24L12 14.4L21.6 24L24 21.6L14.4 12L24 2.4L21.6 0L12 9.6Z"
          fill={color}
        />
      </svg>
    </Link>
  );
};

export default Close;
