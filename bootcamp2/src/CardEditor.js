import React, { useState } from 'react';
import './CardEditor.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { ref, set, push, update } from 'firebase/database';
import { database } from './index';

const CardEditor = (props) => {
  const [cards, setCards] = useState([
    { front: 'front1', back: 'back1' },
    { front: 'front2', back: 'back2' }
  ]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [name, setName] = useState('');

  const { id } = useParams();  // Access route params if needed
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
      <h2>Card Editor</h2>
      <div>
        Deck name:{' '}
        <input
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of deck"
          value={name}
        />
      </div>
      <br />
      <table>
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
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td>
                <button onClick={() => deleteCard(index)}>Delete card</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <input
        name="front"
        onChange={(e) => setFront(e.target.value)}
        placeholder="Front of card"
        value={front}
      />
      <input
        name="back"
        onChange={(e) => setBack(e.target.value)}
        placeholder="Back of card"
        value={back}
      />
      <button onClick={addCard}>Add card</button>
      <hr />
      <div>
        <button
          disabled={!name.trim() || cards.length === 0}
          onClick={createDeck}
        >
          Create deck
        </button>
      </div>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};

export default compose(firebaseConnect())(CardEditor);



// class CardEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cards: [
//         { front: 'front1', back: 'back1' },
//         { front: 'front2', back: 'back2' },
//       ],
//       front: '',
//       back: '',
//       name: '',
//     };
//   }

  

//   addCard = () => {
//     if (!this.state.front.trim() || !this.state.back.trim()) {
//       alert('Cannot add empty card');
//       return;
//     }

//     const newCard = { front: this.state.front, back: this.state.back };
//     const cards = this.state.cards.slice().concat(newCard);
//     this.setState({ cards, front: '', back: '' });
//   };

//   deleteCard = index => {
//     const cards = this.state.cards.slice();
//     cards.splice(index, 1);
//     this.setState({ cards });
//   };

//   handleChange = event =>
//     this.setState({ [event.target.name]: event.target.value });

//   createDeck = () => {
//     const deckId = this.props.firebase.push('/flashcards').key;
//     const updates = {};
//     const newDeck = { cards: this.state.cards, name: this.state.name };
//     updates[`/flashcards/${deckId}`] = newDeck;
//     updates[`/homepage/${deckId}`] = { name: this.state.name };
//     const onComplete = () => this.props.history.push(`/viewer/${deckId}`);
//     this.props.firebase.update('/', updates, onComplete);
//   };

//   render() {
//     const cards = this.state.cards.map((card, index) => {
//       return (
//         <tr key={index}>
//           <td>{card.front}</td>
//           <td>{card.back}</td>
//           <td>
//             <button onClick={() => this.deleteCard(index)}>Delete card</button>
//           </td>
//         </tr>
//       );
//     });

//     return (
//       <div>
//         <h2>Card Editor</h2>
//         <div>
//           Deck name:{' '}
//           <input
//             name="name"
//             onChange={this.handleChange}
//             placeholder="Name of deck"
//             value={this.state.name}
//           />
//         </div>
//         <br />
//         <table>
//           <thead>
//             <tr>
//               <th>Front</th>
//               <th>Back</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>{cards}</tbody>
//         </table>
//         <br />
//         <input
//           name="front"
//           onChange={this.handleChange}
//           placeholder="Front of card"
//           value={this.state.front}
//         />
//         <input
//           name="back"
//           onChange={this.handleChange}
//           placeholder="Back of card"
//           value={this.state.back}
//         />
//         <button onClick={this.addCard}>Add card</button>
//         <hr />
//         <div>
//           <button
//             disabled={!this.state.name.trim() || this.state.cards.length === 0}
//             onClick={this.createDeck}
//           >
//             Create deck
//           </button>
//         </div>
//         <br />
//         <Link to="/">Home</Link>
//       </div>
//     );
//   }
// }

// export default compose(firebaseConnect())(CardEditor);
