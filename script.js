const board = (() => {
	let board = new Array(9);

	const getField = (pos) => {
		return (pos > board.length) ? Error(`Position ${pos} out of bounds.`) : 
		board[pos];
	};

	const setField = (pos, val) => { 
		return (pos > board.length) ? Error(`Position ${pos} out of bounds.`) : 
		board[pos] = val;
	};
	const reset = () => {
		board = new Array(9);
	};

	return {getField, setField, reset};
})();

const Player = (name, symbol) => {	
	const getName = () =>  name;
	const getSymbol = () => symbol;
	return {getName, getSymbol};
};

const display = (() => {
	const fields = document.querySelectorAll(".field");
	const restartBtn = document.getElementById("restart");

	fields.forEach((field, index) => {
		field.addEventListener("click", (e) => {
			console.log(`Clicked ${index}`);
			game.play(index);
			updateFields();
		})
	});

	restartBtn.addEventListener("click", () => {
		game.reset();
	})

	const updateFields = () => {
		fields.forEach((field, index) => {
			field.textContent = board.getField(index);
		});
	}

	return {updateFields};
})();

const game = (() => {	
	const p2 = Player("John", "O");	
	const p1 = Player("Tyler", "X");
	let currentPlayer = p1;

	const play = (index) => {
		board.setField(index, currentPlayer.getSymbol());
		display.updateFields();
		setCurrentPlayer(currentPlayer == p1 ? p2 : p1);
	}

	const setCurrentPlayer = (player) => {
		currentPlayer = player;
	}

	const reset = () => {
		setCurrentPlayer(p1);
		board.reset();
		display.updateFields();
	}

	return {play, reset, setCurrentPlayer};
})();
