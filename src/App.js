import React, { useState, useEffect, useMemo } from "react";
import cloud from "./cloud.gif";
import dragon from "./dragon.gif";
import "./App.css";

// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

function Enemy({ src, name, number, ...rest }) {
  return (
    <img
      src={src}
      className="FF-Battle-Enemy1"
      alt={`${name} #${number}`}
      {...rest}
    />
  );
}

function Player({ name, number, ...rest }) {
  return (
    <img
      src={cloud}
      className="FF-Battle-Player1"
      alt={`${name} #${number}`}
      {...rest}
    />
  );
}

function Hud({ selected }) {
  return (
    <aside className="FF-Hud">
      <div className="FF-Hud-Panel">
        <ul>
          <li className="FF-Hud-Panel-Action">
            <span
              className={selected === 0 ? "triangle" : "selectiable"}
            ></span>
            <span>Attack</span>
          </li>
          <li className="FF-Hud-Panel-Action">
            <span
              className={selected === 1 ? "triangle" : "selectiable"}
            ></span>
            <span>Magic</span>
          </li>
          <li className="FF-Hud-Panel-Action">
            <span
              className={selected === 2 ? "triangle" : "selectiable"}
            ></span>
            <span>Items</span>
          </li>
        </ul>
      </div>

      <div className="FF-Hud-Panel">
        <ul>
          <li className="FF-Hud-Panel-Player">
            <span className="selectiable"></span>
            <span className="name">Cloud</span>
            <span>389 / 440</span>
            <meter id="active_time" value="1.0"></meter>
          </li>
        </ul>
      </div>
    </aside>
  );
}

//const MENU = [["Attack", "Magic", "Items"], ["Cloud"]];
function App() {
  const [count, setCount] = useState(0);
  const upPress = useKeyPress("ArrowUp");
  const downPress = useKeyPress("ArrowDown");

  useEffect(() => {
    if (upPress) {
      setCount((prev) => prev + 1);
    }
    if (downPress) {
      setCount((prev) => prev - 1);
    }
  }, [upPress, downPress]);

  const selectedIndex = useMemo(() => Math.abs(count % 3), [count]);

  return (
    <div className="FF-Battle">
      <div className="FF-Battle-Background">
        <Enemy name="Enemy" number={1} src={dragon} />
        <Player name="Enemy" number={1} style={{ right: 70 }} />
        <Hud selected={selectedIndex} />
      </div>
    </div>
  );
}

export default App;
