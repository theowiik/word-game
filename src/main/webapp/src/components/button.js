import classNames from "classnames";
import React from "react";

const getButtonClassNames = (props) => {
  return classNames({
    'btn-primary': props.primary,
    'btn-secondary': props.secondary,
    'btn-success': props.success,
    'btn-danger': props.danger,
  });
};

function Button({
  label,
  onClick,
  primary,
  danger,
  success,
  secondary,
}) {
  const classes = getButtonClassNames({ primary, secondary, danger, success });

  return (
    <button className={classes}>
      {label}
    </button>
  );
}

export default Button;
