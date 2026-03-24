import React from "react";
import "./loader.css";

const Loader = ({ size = 50, speed = 0.9 }) => {
  const bars = [1, 2, 3, 4, 5];

  return (
    <div
      className="flex items-center justify-center gap-1"
      style={{ height: size, width: size }}
    >
      {bars.map((_, i) => (
        <span
          key={i}
          className="loader-bar"
          style={{
            height: size,
            animationDuration: `${speed}s`,
            animationDelay: `${-0.8 + i * 0.1}s`,
            backgroundColor: [
              "#4c86f9",
              "#49a84c",
              "#f6bb02",
              "#f97316",
              "#2196f3",
            ][i],
          }}
        />
      ))}
    </div>
  );
};

export default Loader;