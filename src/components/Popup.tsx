import React, { useEffect } from "react";
import "./CSS/Popup.css";

interface Props {
  updatePopup: (value: boolean) => null;
}

const Popup: React.FC<Props> = ({ updatePopup }) => {
  return (
    <div className="popup-wrapper border">
      <p>
        Pardon the intrusion, but I require knowledge pertaining to your
        whereabouts.
      </p>
      <sub>(Manual page refresh required)</sub>
      <div className="buttons">
        <button
          onClick={() => {
            updatePopup(false);
          }}
        >
          Okay, sorry
        </button>
        <button
          onClick={() => {
            updatePopup(false);
          }}
        >
          No! Begone, devil!
        </button>
      </div>
    </div>
  );
};

export default Popup;
