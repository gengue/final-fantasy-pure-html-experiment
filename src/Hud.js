import React, { useState, useEffect, useMemo, memo } from "react";
import useKeyPress from "./useKeyPress";

//const MENU = [["Attack", "Magic", "Items"], ["Cloud"]];

function Hud({ atb, onAttack }) {
  const [count, setCount] = useState(0);
  const upPress = useKeyPress("ArrowUp");
  const downPress = useKeyPress("ArrowDown");
  const spacePress = useKeyPress(" ");
  const isReady = atb >= 1.0;

  useEffect(() => {
    if (upPress) {
      setCount((prev) => prev - 1);
    }
    if (downPress) {
      setCount((prev) => prev + 1);
    }
  }, [upPress, downPress]);

  const selected = useMemo(() => Math.abs(count % 3), [count]);

  useEffect(() => {
    let active = false;

    if (isReady && spacePress && !active) {
      active = true;
      console.log("select ", selected);
      if (selected === 0) {
        onAttack();
      }
    }

    return () => (active = false);
  });

  return (
    <aside className="FF-Hud">
      <div className="FF-Hud-Panel">
        <ul
          style={{ transition: "all 200ms ease-out", opacity: isReady ? 1 : 0 }}
        >
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
            <meter id="active_time" value={atb}></meter>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default memo(Hud);
