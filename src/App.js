import React, { useState } from "react";
import "./App.css";
import FlashCard from "./FlashCard";
import flashcardData from "./flashcard.json";

function App() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [userText, setUserText] = useState("");
  const [cards, setCards] = useState(flashcardData);

  const onUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setCards(data);
  };

  const onScrapeWebpage = async () => {
    const response = await fetch("http://localhost:5000/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `url=${url}`,
    });
    const data = await response.json();
    console.log(data); //temp log remove later
    if (Array.isArray(data)) {
      setCards(data);
    } else {
      // create handle for error
    }
  };

  const onTextToCards = async () => {
    const response = await fetch("http://localhost:5000/text-to-cards", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `text=${encodeURIComponent(userText)}`,
    });
    const data = await response.json();
    setCards(data);
  };

  return (
    <div className="container">
      <div className="outputContainer">
        {cards.length > 0 && <FlashCard cards={cards} />}
      </div>
      <div className="inputContainer">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="inputArea"
        />
        <button onClick={onUploadFile} className="transformButton">
          Upload Document
        </button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter webpage URL"
          className="inputArea"
        />
        <button onClick={onScrapeWebpage} className="transformButton">
          Scrape Webpage
        </button>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Enter or paste your text here"
          className="inputArea"
          rows="5"
        />
        <button onClick={onTextToCards} className="transformButton">
          Convert Text to Flashcards
        </button>
      </div>{" "}
      {/* correct closing tag for inputContainer div */}
    </div>
  );
}

export default App;
