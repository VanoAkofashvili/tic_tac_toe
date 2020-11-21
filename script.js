"use strict";
// 0 - X, 1 - O
let activePlayer = "X";
const board = [
	[undefined, undefined, undefined],
	[undefined, undefined, undefined],
	[undefined, undefined, undefined],
];
const board2 = Array(9);

const checkWinner = function () {
	let winner = false;
	// checking rows
	winner = board.some((row) => row.every((cell) => cell === activePlayer));
	if (winner) {
		return true;
	}
	// if winner is false
	else {
		// checking columns
		for (let i = 0; i < 3; i += 1) {
			if (
				board2[i] == board2[i + 3] &&
				board2[i + 3] == board2[i + 6] &&
				board2[i + 6] === activePlayer
			) {
				return true;
			}
		}
		// checking diagonals
		if (
			(board2[0] == board2[4] &&
				board2[4] == board2[8] &&
				board2[8] == activePlayer) ||
			(board2[2] == board2[4] &&
				board2[4] == board2[6] &&
				board2[6] == activePlayer)
		) {
			return true;
		}
	}
	return false;
};

const clickHandler = function (e) {
	// If box is empty
	if (e.target.textContent === "") {
		e.target.textContent = activePlayer;
		const [row, col] = e.target.id.split("-");
		board[+row][+col] = activePlayer;
		board2[+e.target.className.split(" ")[1].split("-")[1]] = activePlayer;

		// Check winner
		if (checkWinner()) {
			const winnerBox = document.querySelector(".winner-box");
			winnerBox.classList.remove("hidden");
			winnerBox.textContent = `Congratulations, Winner is ${activePlayer}`;
			document.querySelector(".overlay").classList.remove("hidden");
		}

		// Change activePlayer
		activePlayer = activePlayer === "X" ? "O" : "X";
	}
};

[...document.querySelectorAll(".box")].forEach((box) => {
	box.textContent = "";
	box.addEventListener("click", clickHandler);
});
