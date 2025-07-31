import React, { useEffect, useState } from "react";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const DrumPad = ({ clip, volume, power, updateDisplay }) => {
  const playSound = () => {
    if (!power) return;
    const audio = document.getElementById(clip.keyTrigger);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    updateDisplay(clip.id);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div className="drum-pad" id={clip.id} onClick={playSound}>
      {clip.keyTrigger}
      <audio className="clip" id={clip.keyTrigger} src={clip.url}></audio>
    </div>
  );
};

const App = () => {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [display, setDisplay] = useState("Ready");

  const updateDisplay = (msg) => {
    setDisplay(msg);
    setTimeout(() => setDisplay(""), 1000);
  };

  const togglePower = () => {
    setPower(!power);
    setDisplay(!power ? "Power ON" : "Power OFF");
  };

  return (
    <div id="drum-machine">
      <h1>🎵 Drum Machine 🎵</h1>
      <div className="controls">
        <label className="switch">
          <input type="checkbox" checked={power} onChange={togglePower} />
          <span className="slider"></span>
        </label>
        <p>Power</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value);
            updateDisplay(`Volume: ${Math.round(e.target.value * 100)}`);
          }}
        />
      </div>

      <div id="display">{display}</div>

      <div className="pad-bank">
        {bankOne.map((clip) => (
          <DrumPad
            key={clip.id}
            clip={clip}
            volume={volume}
            power={power}
            updateDisplay={updateDisplay}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
