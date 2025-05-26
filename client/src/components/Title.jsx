/** @format */

import React from "react";

const Title = ({ title, subtitle, align, font }) => {
  return (
    <div className={`mb-6 text-${align}`}>
      <h2 className={`text-2xl md:text-3xl ${font}`}>{title}</h2>
      {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
};

export default Title;
