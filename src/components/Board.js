const Board = (props) => {
    const { board, handleSelect } = props;

    return (
        <li onClick={() => handleSelect(board)}>{board.title}</li>
    )
}

export default Board;

