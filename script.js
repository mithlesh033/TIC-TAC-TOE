const tiles = document.querySelectorAll('.tile');
const displayPlayer = document.querySelector('.display-player');
const announcer = document.querySelector('.announcer');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.cellIndex;

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayPlayer.textContent = currentPlayer;
}

function checkResult() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            announcer.textContent = `${currentPlayer} wins!`;
        }
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    tiles.forEach(tile => (tile.textContent = ''));
    announcer.textContent = '';
    currentPlayer = 'X';
    displayPlayer.textContent = currentPlayer;
}

// Event listeners for each tile
tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => handleCellClick(index));
});

// Function to handle cell click
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    tiles[index].textContent = currentPlayer;
    handleResultValidation();
}

// Function to check for a winner or a tie
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? 'Player X Wins!' : 'Player O Wins!');
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        announce('Tie Game!');
        gameActive = false;
        return;
    }

    changePlayer();
}

// Function to announce the winner or a tie
function announce(message) {
    announcer.innerHTML = message;
    announcer.classList.remove('hide');
}

// Function to change the current player
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayPlayer.textContent = currentPlayer;
}

// Reset button event listener
resetButton.addEventListener('click', resetGame);

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.textContent = '';
    });
}
