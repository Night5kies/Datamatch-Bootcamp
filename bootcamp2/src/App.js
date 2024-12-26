import React from 'react';
import Homepage from './Homepage';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import { Routes, Route } from 'react-router-dom';
// import Test from './Test';


const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/viewer/:deckId" element={<CardViewer />}/>
      <Route exact path="/editor" element={<CardEditor />} />
      {/* <Route exact path="/test/:id" element={<Test />} /> */}
      <Route element={<div>Page not found!</div>}/>
    </Routes>
  );
}


export default App;