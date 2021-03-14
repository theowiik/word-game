import classNames from "classnames";
import React from "react";

const getButtonClassNames = (props) => {
  return classNames({
    'btn-primary': props.primary,
    'btn-secondary': props.secondary,
    'btn-success': props.success,
    'btn-danger': props.danger,
    'large': props.large,
    'disabled': props.disabled
  });
};

export function Button({
  label,
  type,
  onClick,
  primary,
  danger,
  success,
  secondary,
  large,
  disabled
}) {
  const classes = getButtonClassNames({ primary, secondary, danger, success, large, disabled });

  return (
    <button onClick={disabled ? null : onClick} type={type} className={classes}>
      {label}
    </button>
  );
}
