import React, { CSSProperties } from "react";
import "./CSS/Loading.css";

interface Props {
  txt: string;
}

interface CSSvar extends CSSProperties {
  "--i": number;
}

const Loading: React.FC<Props> = ({ txt }) => {
  txt += "...";

  return (
    <div className="loader-wrapper">
      {txt.split("").map((character, index) => {
        return <span style={{ "--i": index } as CSSvar}>{character}</span>;
      })}
    </div>
  );
};

export default Loading;
