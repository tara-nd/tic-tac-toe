document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const nameContainer = document.getElementById('nameContainer');
    const playerNameInput = document.getElementById('playerName');
    const submitNameButton = document.getElementById('submitName');
    const choiceContainer = document.getElementById('choiceContainer');
    const chooseX = document.getElementById('chooseX');
    const chooseO = document.getElementById('chooseO');
    const scoreContainer = document.getElementById('scoreContainer');
    const playerLabel = document.getElementById('playerLabel');
    const playerScoreElem = document.getElementById('playerScore');
    const computerScoreElem = document.getElementById('computerScore');
    const drawsElem = document.getElementById('draws');

    let playerName = '';
    let currentPlayer = 'X';
    let playerMarker = 'X';
    let computerMarker = 'O';
    let boardState = Array(9).fill(null);
    let gameActive = false;
    let playerScore = 0;
    let computerScore = 0;
    let draws = 0;

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

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = cell.getAttribute('data-index');

        if (boardState[cellIndex] !== null || !gameActive || currentPlayer !== playerMarker) {
            return;
        }

        cell.textContent = currentPlayer;
        boardState[cellIndex] = currentPlayer;
        checkResult();

        currentPlayer = computerMarker;
        if (gameActive) {
            setTimeout(computerMove, 500);
        }
    };

    const computerMove = () => {
        const availableCells = boardState.map((value, index) => value === null ? index : null).filter(value => value !== null);
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

        if (randomIndex !== undefined) {
            boardState[randomIndex] = currentPlayer;
            cells[randomIndex].textContent = currentPlayer;
            checkResult();
            currentPlayer = playerMarker;
        }
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winner = currentPlayer === playerMarker ? playerName : 'Computer';
            setTimeout(() => alert(`${winner} wins!`), 100);
            gameActive = false;
            updateScore(currentPlayer);
            return;
        }

        if (!boardState.includes(null)) {
            setTimeout(() => alert("It's a draw!"), 100);
            gameActive = false;
            updateScore(null);
        }
    };

    const updateScore = (winner) => {
        if (winner === playerMarker) {
            playerScore++;
            playerScoreElem.textContent = playerScore;
        } else if (winner === computerMarker) {
            computerScore++;
            computerScoreElem.textContent = computerScore;
        } else {
            draws++;
            drawsElem.textContent = draws;
        }
    };

    const resetGame = () => {
        currentPlayer = playerMarker;
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
    };

    const startGame = (marker) => {
        playerMarker = marker;
        computerMarker = marker === 'X' ? 'O' : 'X';
        currentPlayer = playerMarker;
        gameActive = true;

        choiceContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        gameBoard.style.display = 'grid';
        resetButton.style.display = 'inline-block';

        if (computerMarker === 'X') {
            setTimeout(computerMove, 500);
        }
    };

    submitNameButton.addEventListener('click', () => {
        playerName = playerNameInput.value.trim();
        if (playerName) {
            playerLabel.textContent = playerName;
            nameContainer.style.display = 'none';
            choiceContainer.style.display = 'block';
        } else {
            alert('Please enter your name.');
        }
    });

    chooseX.addEventListener('click', () => startGame('X'));
    chooseO.addEventListener('click', () => startGame('O'));

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', () => {
        resetGame();
        choiceContainer.style.display = 'block';
        scoreContainer.style.display = 'none';
        gameBoard.style.display = 'none';
        resetButton.style.display = 'none';
    });

    // Add Bubbles
    const colors = ['blue', 'rose', 'purple'];
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble', colors[Math.floor(Math.random() * colors.length)]);
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${Math.random() * 7 + 5}s`; // Between 5s and 12s
        bubble.style.width = `${Math.random() * 20 + 20}px`; // Between 20px and 40px
        bubble.style.height = bubble.style.width;
        document.body.appendChild(bubble);
    }
});
