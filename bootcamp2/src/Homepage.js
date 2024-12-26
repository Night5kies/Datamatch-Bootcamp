import React from "react";
import { Link } from 'react-router-dom';
import { database } from './index';
import { ref, get, set } from 'firebase/database';

function Homepage() {
    const [keys, setKeys] = React.useState([]);
    const [flashcards, setFlashcards] = React.useState({});
    const flashcardsRef = ref(database, '/flashcards');
    get(flashcardsRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFlashcards(snapshot.val());
          setKeys(Object.keys(flashcards));
        } else {
          console.log("No data available");
        }
      })

    
    return (
        <div>
            <h1>Homepage</h1>
            {keys &&keys.map((key) => (
                <li key={key}>
                    <Link to={`/viewer/${key}`}>{flashcards[key].name}</Link>
                </li>
            ))}
            {/* <li>
                <Link to="/viewer">Card Viewer</Link>
            </li> */}
            <li>
                <Link to="/editor">Editor</Link>
            </li>
        </div>
    );
}

export default Homepage;