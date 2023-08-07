// FlashCard.js
import React, { useState } from "react";
import "./FlashCard.css";

function FlashCard({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardOrder, setCardOrder] = useState([...Array(cards.length).keys()]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowAnswer(false);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
    setShowAnswer(false);
  };

  const randomizeOrder = () => {
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const currentCard = cards[cardOrder[currentIndex]];

  return (
    <div className="cardContainer">
      <div className="card" onClick={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? currentCard.Answer : currentCard.Question}
      </div>
      <div className="cardControls">
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
        <button onClick={randomizeOrder}>Randomize</button>
      </div>
    </div>
  );
}

export default FlashCard;
