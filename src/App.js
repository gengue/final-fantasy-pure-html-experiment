import React, { useState, useEffect, useMemo, useRef } from "react";
import { getRandomIntInclusive } from "./utils";
import cloud from "./assets/cloud.gif";
import dragon from "./assets/dragon.gif";
import Hud from "./Hud";
import "./App.css";

function Enemy({ src, name, number, isBeingHit, style, ...rest }) {
  const animation = isBeingHit
    ? "damage 400ms linear"
    : "idle infinite 4s linear";
  return (
    <img
      src={src}
      className="FF-Battle-Enemy1"
      alt={`${name} #${number}`}
      style={{ animation, ...style }}
      {...rest}
    />
  );
}

function Player({ name, isAttacking, style, ...rest }) {
  const animation = isAttacking
    ? "attack 2s linear"
    : "idle infinite 4s linear";
  return (
    <img
      src={cloud}
      className="FF-Battle-Player1"
      alt={name}
      style={{ animation, ...style }}
      {...rest}
    />
  );
}

const TIME_PERIOD_CHECK = 800;
const CLOUD = {
  name: "CLOUD",
  atb: 0.0,
  atbRate: [12, 21], // range
};
const DRAGON = {
  name: "DRAGON",
  atb: 0.0,
  atbRate: [8, 12], // range
};

function App() {
  const [player, setPlayer] = useState(CLOUD);
  const [enemy, setEnemy] = useState(DRAGON);
  const [isAttacking, setIsAttacking] = useState([false, null]);
  const [isBeingHit, setIsBeingHit] = useState([false, null]);

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      if (player.atb < 1.0) {
        const value = getRandomIntInclusive(...player.atbRate) / 100;
        setPlayer((prev) => ({ ...prev, atb: prev.atb + value }));
      }
    }, TIME_PERIOD_CHECK);

    return () => {
      clearInterval(timer);
    };
  }, [player.atb, player.atbRate]);

  const handleAttack = () => {
    setIsAttacking([true, player.name]);

    setTimeout(() => {
      setIsBeingHit([true, enemy.name]);
    }, 1_000);

    setTimeout(() => {
      setPlayer((prev) => ({ ...prev, atb: 0.0 }));
      setIsAttacking([false, player.name]);
      setIsBeingHit([false, enemy.name]);
    }, 2_000);
  };

  return (
    <div className="FF-Battle">
      <div className="FF-Battle-Background">
        <Enemy
          name={enemy.name}
          number={1}
          src={dragon}
          isBeingHit={isBeingHit[0] && isBeingHit[1] === enemy.name}
        />
        <Player
          name="CLOUD"
          style={{ right: 70 }}
          isAttacking={isAttacking[0] && isAttacking[1] === player.name}
        />
        <Hud atb={player.atb} onAttack={handleAttack} />
      </div>
    </div>
  );
}

export default App;
