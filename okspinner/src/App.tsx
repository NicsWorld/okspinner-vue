import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css"; // Import CSS file with animation styles

const App: React.FC = () => {
  const [names, setNames] = useState<string[]>([
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emily",
  ]);

  const shuffleNames = () => {
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    setNames(shuffledNames);
  };

  return (
    <div className="container">
      <h1>Standup order</h1>
      <button onClick={shuffleNames}>Shuffle Names</button>
      <TransitionGroup>
        <div className="hug">
          {names.map((name, index) => (
            <CSSTransition key={index} timeout={500} classNames="name">
              <div>{name}</div>
            </CSSTransition>
          ))}
        </div>
      </TransitionGroup>
    </div>
  );
};

export default App;
