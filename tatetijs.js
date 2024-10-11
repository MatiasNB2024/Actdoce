let turn = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = turn;
    clickedCell.innerText = turn;
    checkResult();
}

function checkResult() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        let a = board[condition[0]];
        let b = board[condition[1]];
        let c = board[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `El jugador ${turn} ha ganado!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = 'Empate!';
        gameActive = false;
        return;
    }

    turn = turn === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Turno del jugador ${turn}`;
}

function resetGame() {
    turn = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.innerText = `Turno del jugador ${turn}`;
    cells.forEach(cell => (cell.innerText = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('reset').addEventListener('click', resetGame);
