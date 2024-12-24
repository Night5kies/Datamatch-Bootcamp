import React from "react";
import { Link } from 'react-router-dom';


function Homepage() {
    return (
        <div>
            <h1>Homepage</h1>
            <li>
                <Link to="/viewer">Card Viewer</Link>
            </li>
            <li>
                <Link to="/editor">Editor</Link>
            </li>
        </div>
    );
}

export default Homepage;