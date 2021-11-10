const board = (() => {
	let board = new Array(9);

	const getBoard = (pos) => {
		if (pos > board.length) {
			return Error(`Position ${pos} out of bounds.`);
		}
		return board[pos];
	}

	const setBoard = (pos, val) => { 
		if (pos > board.length) {
			return Error(`Position ${pos} out of bounds.`);
		}
		board[pos] = val;
	};

	const reset = () => {
		board = new Array(9);
	}

	return {getBoard, setBoard, reset};

})();

const Player = (name, symbol) => {
	this.name = name;
	this.symbol = symbol;
	
	const getName = () => {
		return this.name;
	}

	const getSymbol = () => {
		return this.symbol;
	}

	return {getName, getSymbol};
};

// Testing
console.log(board.getBoard(4)); // undefined
console.log(board.setBoard(4, "X")); // => "X"
console.log(board.getBoard(4)); // "X"
console.log(board.reset());
console.log(board.setBoard(4, "O")); // => "X"
console.log(board.getBoard(4)); // "X"
let p1 = Player("Tyler", "X");
console.log(p1.getName());

