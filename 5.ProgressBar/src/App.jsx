import { useEffect, useState } from "react";
import "./App.css";

const ProgessBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
  }, [progress]);

  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          // width: `${progress}%`,
          transform: `translateX(${animatedProgress - 100}%)`,
          color:
            animatedProgress <= 5
              ? "orange"
              : animatedProgress >= 90
                ? "cyan"
                : "white",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax="100"
        aria-valuemin="0"
      >
        {progress}%
      </div>
    </div>
  );
};

function App() {
  const bars = [0, 1, 5, 10, 30, 50, 70, 90, 64, 100];
  return (
    <div>
      <h1 className="heading">Progress Bar</h1>
      {bars.map((progress, i) => (
        <ProgessBar key={i} progress={progress} />
      ))}
    </div>
  );
}

export default App;
