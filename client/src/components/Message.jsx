import React from "react";
import classNames from "classnames";
const Message = ({ children, time, isYou }) => {
  const msgStyle = classNames("self-center", {
    "text-green-400": isYou,
  });
  return (
    <li className="flex justify-between h-10 px-3">
      <p className={msgStyle}>{children}</p>
      <span className="text-xs self-end">{time}</span>
    </li>
  );
};

export default Message;
