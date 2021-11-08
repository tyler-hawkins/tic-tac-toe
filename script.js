const board = (() => {
	let _board = new Array(9);
	const getBoard = (pos) => _board[pos];
	const setBoard = (pos, val) => _board[pos] = val;
	return {getBoard, setBoard}
})();

// Testing
console.log(board.getBoard(4)); // undefined
console.log(board.setBoard(4, "X")); // => "X"
console.log(board.getBoard(4)); // "X"
