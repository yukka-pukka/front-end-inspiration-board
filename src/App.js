import './App.css';
import Board from './components/Board';
import Card from './components/Card';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import React, { useState } from 'react';

const axios = require('axios');

// fake data to use until we have a backend
const fakeCardData = {
  id: 'abc',
  message: 'Fake card'
}

const fakeBoardData = {
  id: '123',
  title: 'Fake board'
}

// set this to false to use the real backend once it's ready
const FAKE_BACKEND = true;

const fakeCardList = [fakeCardData];
const fakeBoardList = [fakeBoardData];

// loads fake data until we have a backend
const getBoards = () => {
  if (FAKE_BACKEND) {
    return Promise.resolve([...fakeBoardList])
  }
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
}

const getCards = (boardId) => {
  if (FAKE_BACKEND) {
    return Promise.resolve([...fakeCardList])
  }
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/cards/${boardId}`)
}

const createBoard = (newBoard) => {
  if (FAKE_BACKEND) {
    fakeBoardList.push(newBoard);
    return Promise.resolve(newBoard);
  }
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
}

const createCard = (boardId, newCard) => {
  if (FAKE_BACKEND) {
    fakeCardList.push(newCard);
    return Promise.resolve(newCard);
  }
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/${boardId}/cards`, newCard)
}

function App() {

  const [boardErrorMessage, setBoardErrorMessage] = useState("")
  const [selectedBoard, setSelectedBoard] = useState(undefined)
  const [boardsData, setBoardsData] = useState([])

  
  const [cardErrorMessage, setCardErrorMessage] = useState("")
  const [cardsByBoardId, setCardsbyBoardId] = useState([])

  React.useEffect(() => {
    getBoards()
      .then((board_data) => {
        setBoardsData(board_data)
      })
      .catch(function (error) {
        console.error("failed to fetch board", error);
        setBoardErrorMessage("failed to fetch board");
      });
  }, [])

  React.useEffect(() => {
    if (!selectedBoard) return

    getCards(selectedBoard.id)
      .then((cards) => {
        setCardsbyBoardId(cards)
      })
      .catch(function (error) {
        console.error("failed to fetch cards", error);
      });
  }, [selectedBoard])

  // add new board, API call
  const addBoard = React.useCallback((boardData) => {
    console.log("API")

    const newBoard = {
      title: boardData.title,
      owner: boardData.owner
    }
    createBoard(newBoard)
      .then(function (response) {
        console.log(response);
        // re-fetch the board list to show the new one
        getBoards()
          .then((board_data) => {
            setBoardsData(board_data)
          })
          .catch(function (error) {
            console.error("failed to fetch board", error);
            setBoardErrorMessage("failed to fetch board");
          });
      })
      .catch(function (error) {
        setBoardErrorMessage("error!!!");
      });
  }, [boardsData, setBoardsData])

  const addCard = (message) => {
    console.log("API")
    
    // const newCard = {
    //   message: message,
    //   board_id = selectedBoard.id
    // }
    createCard(selectedBoard.id, message)
      .then(function (response) {
        console.log(response);
        getCards(selectedBoard.id)
          .then((cards) => {
            setCardsbyBoardId(cards)
          })
          .catch(function (error) {
            console.error("failed to fetch cards", error);
          });
      })
      .catch(function (error) {
        setCardErrorMessage("card error msg");
      });

  };
  console.log('selected cards', cardsByBoardId)

  

  return (
    <main>
      <h1>Inspiration Board</h1>
      <div>ALL boards</div>
      <ul>
        {boardsData.map(board => {
          return <Board key={board.id} board={board} handleSelect={setSelectedBoard} />
        })}
      </ul>
      <NewBoardForm addBoardCallback={addBoard}> </NewBoardForm>
      <div>{boardErrorMessage}</div>

      {selectedBoard && <>
        <NewCardForm addCardCallback={addCard}></NewCardForm>
        <div>{cardErrorMessage}</div>
        {/* <CardDisplay board={selectedboard} /> */}

        <h3>Cards for {selectedBoard.title}</h3>
        {cardsByBoardId.map((card) => {
          return <Card key={card.id} card={card} />
        })}
      </>
      }


    </main>
  );
};

export default App;