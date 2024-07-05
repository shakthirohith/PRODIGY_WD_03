document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameOver = false;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || isGameOver) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            statusText.textContent = `${currentPlayer} wins!`;
            isGameOver = true;
        } else if (board.every(cell => cell !== '')) {
            statusText.textContent = 'Draw!';
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `It's ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        isGameOver = false;
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    }
});
