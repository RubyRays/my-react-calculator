import React from "react";

function Button(prop) {
  return (
    <div>
      <button
        onClick={prop.onClicked}
        className="calc-button"
        value={prop.name}
      >
        {prop.name}
      </button>
    </div>
  );
}
export default Button;
