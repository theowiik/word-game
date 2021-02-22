import React from "react";

function Button({
  className,
  label,
  onClick,
  primary,
  danger,
  success,
  secondary,
}) {
  return (
    <button
      className={`${className} font-bold ${primary ? "btn-primary" : ""} ${
        danger ? "btn-danger" : ""
      } ${success ? "btn-success" : ""} ${secondary ? "btn-secondary" : ""}`}
    >
      {label}
    </button>
  );
}

export default Button;
