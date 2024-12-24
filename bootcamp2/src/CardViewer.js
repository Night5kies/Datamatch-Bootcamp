import React from 'react';
import './CardViewer.css';
import { Link } from 'react-router-dom';
class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      side: true,
      card: 0
     };
  }

handleClick = () => {
  this.setState({ side: !this.state.side });
}
changeCard = direction => {
  this.setState({ card: this.state.card + direction });
}

  render() {
    return (
      <div>
        <h2>Card Viewer</h2>
        <div>{this.state.card+1}/{this.props.cards.length}</div>
        <button className="card" onClick={this.handleClick}>
          {this.state.side ? this.props.cards[this.state.card].front : this.props.cards[this.state.card].back}
        </button>
        <div>
          {this.state.card > 0 ? <button onClick={() => this.changeCard(-1)}>Previous Card</button> : null}
          {this.state.card < this.props.cards.length - 1 ? <button onClick={() => this.changeCard(1)}>Next Card</button> : null}
        </div>
        <hr />
        <Link to="/editor">Go to card editor</Link>      </div>
    );
  }
}

export default CardViewer;