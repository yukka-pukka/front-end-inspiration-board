import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import NewBoardForm from './components/NewBoardForm';

function App() {

  const [boardsData, setBoardsData] = useState([{
    titleData:"Shopping List",
    ownerData:"Priscille"
  }]
  )

  const addBoardsData = newBoard => {
    const newBoardList = [...boardsData];

    const nextId = Math.max(...newBoardList.map(board => board.id)) + 1;

    newBoardList.push({
      id: nextId,
      titleData: newBoard.titleData,
      ownerData: newBoard.ownerData
    });
    setBoardsData(newBoardList)
  }


  return (
    <div className="App">
      <header className="App-header">
      <h1>Inspiration Board</h1>
      </header>
      <main>
        <NewBoardForm addBoardCallback = {addBoardsData}></NewBoardForm>
      </main>
    </div>
  );
}

export default App;
