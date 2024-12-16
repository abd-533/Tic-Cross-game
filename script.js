const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const nameForm = document.getElementById('name-form');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let player1Name = '';
let player2Name = '';

// Start the game after both players enter their names
startButton.addEventListener('click', () => {
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();

    if (player1Name && player2Name) {
        // Hide the name input form and show the game board
        nameForm.style.display = 'none';  
        board.style.display = 'grid';  
        restartButton.style.display = 'inline-block';  
        message.textContent = `${player1Name}'s turn (X)`;
    } else {
        message.textContent = 'Please enter names for both players!';
        message.style.color = 'red';
    }
});

// Game logic when a player clicks on a cell
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (gameBoard[index] === '' && !gameOver) {
            gameBoard[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = currentPlayer === 'X' ? `${player1Name}'s turn (X)` : `${player2Name}'s turn (O)`;
        }
    });
});

// Check if there's a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            message.textContent = gameBoard[a] === 'X' ? `${player1Name} Wins!` : `${player2Name} Wins!`;
            message.style.color = '#4CAF50';
            return;
        }
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        gameOver = true;
        message.textContent = "It's a Draw!";
        message.style.color = '#FF9800';
    }
}

// Restart the game (reset inputs and board)
restartButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    message.style.color = '';

    // Show the name input form again
    nameForm.style.display = 'block';
    board.style.display = 'none';
    restartButton.style.display = 'none';

    // Clear player names from the input fields
    player1Input.value = '';
    player2Input.value = '';
});
