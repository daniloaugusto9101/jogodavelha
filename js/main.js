const cellElents = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-restart-button]")


let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const startGame = () => {
    isCircleTurn = false;
    for (const cell of cellElents) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "Circulo venceu" : "X venceu";
    }

    winningMessage.classList.add("show-winning-message");
}

const handleRestartclick = () => {

}

const checkFormWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElents[index].classList.contains(currentPlayer);
        })
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
}

const handleClick = (e) => {
    // colocar a amrca do x ou o
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";
    placeMark(cell, classToAdd);


    // checar por vitoria
    const isWin = checkFormWin(classToAdd);
    if (isWin) {
        endGame(false)
    }

    // checar empate

    // mudar simbolo
    swapTurns();
}


startGame();

restartButton.addEventListener("click", startGame);
