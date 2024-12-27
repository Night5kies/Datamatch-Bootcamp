import React from "react";
import { Link } from 'react-router-dom';
import { database } from './index';
import { ref, get } from 'firebase/database';
import "./Homepage.css";

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
        <div style={{ textAlign: "center"}}>
            <h1 className="fancy-title" >Homepage</h1>
            <div style={{
                display: "flex",         
                justifyContent: "center", 
                alignItems: "center",            
            }}>
                <Link to="/editor" className="button-link" style={{backgroundColor: "violet"}}>Editor</Link>
            </div>
            <div className="container">
                {keys &&keys.map((key) => (
                    <Link key={key} to={`/viewer/${key}`} className="button-link">{flashcards[key].name}</Link>
                ))}
            </div>
        </div>
    );
}

export default Homepage;