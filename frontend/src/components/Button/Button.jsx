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

/**
 * Custom button used throughout the app
 * @param label what to write in the button
 * @param type what type of button it should be
 * @param onClick what it should do when clicked
 * @param primary change to primary style if chosen
 * @param danger change to danger style if chosen
 * @param success change to success style if chosen
 * @param secondary change to custom secondary style if chosen
 * @param large change to custom large style if chosen
 * @param disabled change to custom disabled style if chosen
 * @returns {JSX.Element}
 * @constructor
 */
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
