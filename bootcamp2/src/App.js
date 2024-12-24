import React from 'react';
import Homepage from './Homepage';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import { Routes, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ],
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  switchMode = () => {
    if (this.state.cards.length === 0) return;
    this.setState({ editor: !this.state.editor });
  };

  render() {
    return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/viewer" element={<CardViewer cards={this.state.cards} />}/>
        <Route path="/editor" element={<CardEditor 
            addCard={this.addCard}
            cards={this.state.cards}
            deleteCard={this.deleteCard} />} />
      </Routes>
    );
  }
}

export default App;