import React, { useState } from 'react';
import './CardViewer.css';
import { Link, useParams } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { database } from './index';
import { ref, get } from 'firebase/database';


const CardViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayFront, setDisplayFront] = useState(true);

  const [cards, setCards] = useState([]);
  const [name, setName] = useState('');

  const { deckId } = useParams();
  const deckRef = ref(database, `/flashcards/${deckId}`);
  let deck = null; 
  get(deckRef).then((snapshot) => {
    if (snapshot.exists()) {
      deck = snapshot.val();
      setName(deck.name);
      setCards(deck.cards);
    } else {
      console.log("No data available");
      deck = null;
    }
  })

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDisplayFront(true);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDisplayFront(true);
    }
  };

  const flipCard = () => setDisplayFront(!displayFront);

  if (!isLoaded(cards)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(cards)) {
    return <div>Page not found!</div>;
  }

  const card = cards[currentIndex][displayFront ? 'front' : 'back'];

  return (
    <div>
      <h2 className='title'>{name}</h2>
      <div className="text">
        Card {currentIndex + 1} out of {cards.length}.
      </div>
      <div className='card-container'>
        <div className="card" onClick={flipCard}>
          {card}
        </div>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <button disabled={currentIndex === 0} onClick={prevCard} className='aesthetic-button'>
          Prev card
        </button>
        <button disabled={currentIndex === cards.length - 1} onClick={nextCard} className='aesthetic-button'>
          Next card
        </button>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Link to="/" className='aesthetic-button'>Home</Link>
      </div>
    </div>
  );
};

export default compose(firebaseConnect())(CardViewer);
