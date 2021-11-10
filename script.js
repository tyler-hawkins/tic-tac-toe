const board = (() => {
	let board = new Array(9);

	// TODO: Cache rows/cols/diags that contain both player's symbols, and skip over them.
	// Lines with two different symbols cannot be a win for either player.
	const checkRows = () => {
		for (let i = 0; i < 9; i += 3) {
			if (getField(i) === undefined) { // Skip over fields with no symbol.
				continue;
			}
			if (getField(i) === getField(i + 1) &&
				getField(i + 1) === getField(i + 2)) {
				return true;
			}
		}
		return false;
	}

	const checkCols = () => {
		for (let i = 0; i < 3; i++) {
			if (getField(i) === undefined) { // Skip over fields with no symbol.
				continue;
			}
			if (getField(i) === getField(i + 3) && 
				getField(i + 3) === getField(i + 6)) {
				return true;
			}
		}
		return false;
	}

	const checkDiagonals = () => {
		return ((getField(0) !== undefined) && getField(0) === getField(4) && 
			getField(4) === getField(8)) ||
			(getField(2) !== undefined) && (getField(2) === getField(4) &&
				getField(4) === getField(6));
	}

	const checkDraw = () => {
		for (let i = 0; i < board.length; i++) {
			if (board[i] == undefined) {
				return false;
			}
		}
		return true;
	}

	const getField = (pos) => {
		return (pos > board.length) ? Error(`Position ${pos} out of bounds.`) : 
		board[pos];
	}

	const setField = (pos, val) => { 
		return (pos > board.length) ? Error(`Position ${pos} out of bounds.`) : 
		board[pos] = val;
	}

	const reset = () => {
		board = new Array(9);
	}

	const checkWin = () => {
		return checkRows() || checkCols() || checkDiagonals();
	}

	return {getField, setField, reset, checkWin, checkDraw};
})();

const Player = (name, symbol) => {	
	const getName = () =>  name;
	const getSymbol = () => symbol;
	return {getName, getSymbol};
};

const display = (() => {
	const fields = document.querySelectorAll(".field");
	const restartBtn = document.getElementById("restart");
	const message = document.getElementById("message");

	fields.forEach((field, index) => {
		field.addEventListener("click", (e) => {
			// Don't process if game over
			if (board.getField(index) !== undefined || game.getIsOver()) {
				return;
			}
			game.play(index);
			updateFields();
		})
	});

	restartBtn.addEventListener("click", () => {
		game.reset();
	});

	const updateFields = () => {
		fields.forEach((field, index) => {
			field.textContent = board.getField(index);
		});
	}

	const showMessage = (str) => {
		message.innerText = `${str}`
	}

	return {updateFields, showMessage};
})();

const game = (() => {	
	const p2 = Player("O", "O");	
	const p1 = Player("X", "X");
	let currentPlayer = p1;
	let isOver = false;

	const play = (index) => {
		board.setField(index, currentPlayer.getSymbol());
		display.updateFields();

		if (board.checkWin()) {
			display.showMessage(`${game.getCurrentPlayer().getName()} wins!`);
			setIsOver(true);
		} else if (board.checkDraw()) {
			display.showMessage(`It's a draw!`);
			setIsOver(true);
		} else {
			setCurrentPlayer(currentPlayer == p1 ? p2 : p1);
			display.showMessage(`${getCurrentPlayer().getName()}'s turn.`);
		}
	}

	const getIsOver = () => {
		return isOver;
	}

	const setIsOver = (b) => {
		isOver = b;
	}

	const getCurrentPlayer = () => {
		return currentPlayer;
	}

	const setCurrentPlayer = (player) => {
		currentPlayer = player;
	}

	const reset = () => {
		setCurrentPlayer(p1);
		board.reset();
		display.updateFields();
		display.showMessage(`${getCurrentPlayer().getName()}'s turn.`);
	}

	return {play, reset, getCurrentPlayer, getIsOver};
})();
