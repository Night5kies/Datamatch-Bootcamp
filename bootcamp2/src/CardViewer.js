// import React, { useState } from 'react';
// import './CardViewer.css';
// import { Link, useParams } from 'react-router-dom';
// import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { database } from './index';
// import { ref, get, push, update } from 'firebase/database';


// const CardViewer = (props) => {
//   const { deckId } = useParams(); // Using useParams to access deckId from URL
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [displayFront, setDisplayFront] = useState(true);

//   const nextCard = () => {
//     if (currentIndex < props.cards.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setDisplayFront(true);
//     }
//   };

//   const prevCard = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//       setDisplayFront(true);
//     }
//   };

//   const flipCard = () => setDisplayFront(!displayFront);

//   if (!isLoaded(props.cards)) {
//     return <div>Loading...</div>;
//   }

//   if (isEmpty(props.cards)) {
//     return <div>Page not found!</div>;
//   }

//   const card = props.cards[currentIndex][displayFront ? 'front' : 'back'];

//   return (
//     <div>
//       <h2>{props.name}</h2>
//       Card {currentIndex + 1} out of {props.cards.length}.
//       <div className="card" onClick={flipCard}>
//         {card}
//       </div>
//       <br />
//       <button
//         disabled={currentIndex === 0}
//         onClick={prevCard}
//       >
//         Prev card
//       </button>
//       <button
//         disabled={currentIndex === props.cards.length - 1}
//         onClick={nextCard}
//       >
//         Next card
//       </button>
//       <hr />
//       <Link to="/">Home</Link>
//     </div>
//   );
// };

// const mapStateToProps = (state, props) => {
//   const deckRef = ref(database, `/flashcards/${props.deckId}`); 
//   const deck = get(deckRef);
//   const name = deck && deck.name;
//   const cards = deck && deck.cards;
//   return { cards: cards, name: name };
// };

// export default compose(
//   firebaseConnect((props) => {
//     const deckId = props.deckId;  // Using the deckId directly from props
//     console.log(deckId);
//     return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
//   }),
//   connect(mapStateToProps)
// )(CardViewer);


import React, { useState } from 'react';
import './CardViewer.css';
import { Link, useParams } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { database } from './index';
import { ref, get, child, push, update } from 'firebase/database';


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
      <h2>{name}</h2>
      Card {currentIndex + 1} out of {cards.length}.
      <div className="card" onClick={flipCard}>
        {card}
      </div>
      <br />
      <button disabled={currentIndex === 0} onClick={prevCard}>
        Prev card
      </button>
      <button disabled={currentIndex === cards.length - 1} onClick={nextCard}>
        Next card
      </button>
      <hr />
      <Link to="/">Home</Link>
    </div>
  );
};

export default compose(firebaseConnect())(CardViewer);
