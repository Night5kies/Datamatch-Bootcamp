import React, { useState } from 'react';
import './CardEditor.css';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { ref, push, update } from 'firebase/database';
import { database } from './index';

const CardEditor = (props) => {
  const [cards, setCards] = useState([
    { front: 'front1', back: 'back1' },
    { front: 'front2', back: 'back2' }
  ]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();  // For programmatic navigation

  const addCard = () => {
    if (front.trim() === '' || back.trim() === '') return;
    const newCard = { front: front.trim(), back: back.trim() };
    setCards([...cards, newCard]);
    setFront('');
    setBack('');
  };

  const deleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const createDeck = () => {
    const flashcardsRef = ref(database, '/flashcards');
    const newFlashcardRef = push(flashcardsRef);
    const deckId = newFlashcardRef.key;

    const updates = {};
    const newDeck = { cards, name };
    updates[`/flashcards/${deckId}`] = newDeck;
    updates[`/homepage/${deckId}`] = { name: name };
    const onComplete = () => navigate(`/viewer/${deckId}`);
    update(ref(database, '/'), updates).then(onComplete);
  };

  return (
    <div>
      <h2 className='title'>Card Editor</h2>
      <div className='text'>
        Deck name:{' '}
        <input
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of deck"
          className='aesthetic-input'
          value={name}
        />
      </div>
      <br />
      <table className='aesthetic-table'>
        <thead>
          <tr>
            <th>Front</th>
            <th>Back</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td className='regular-text'>{card.front}</td>
              <td className='regular-text'>{card.back}</td>
              <td>
                <button onClick={() => deleteCard(index)} className='aesthetic-button'>Delete card</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div style={{ display: 'flex' , alignContent: 'center', justifyContent: 'center'}}>
        <input
          name="front"
          onChange={(e) => setFront(e.target.value)}
          placeholder="Front of card"
          className='aesthetic-input'
          value={front}
          />
        <input
          name="back"
          onChange={(e) => setBack(e.target.value)}
          placeholder="Back of card"
          className='aesthetic-input'
          value={back}
          />
      </div>
      <div style={{ display: 'flex' , alignContent: 'center', justifyContent: 'center', marginTop: '10px'}}>
        <button onClick={addCard} className='aesthetic-button'>Add card</button>
      </div>
      <hr />
      <div style={{ display: 'flex' , alignContent: 'center', justifyContent: 'center', marginTop: '10px'}}>
        <button
          disabled={!name.trim() || cards.length === 0}
          onClick={createDeck}
          className='aesthetic-button'
          style={{ margin: '10px' }}
        >
          Create deck
        </button>
        <Link to="/" className='aesthetic-button' style={{ margin: '10px' }}>Home</Link>
      </div>
      <br />
    </div>
  );
};

export default compose(firebaseConnect())(CardEditor);


