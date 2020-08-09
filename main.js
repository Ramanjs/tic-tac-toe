const gameBoard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];
    const winningIndexes = [[0, 1, 2],
                            [3, 4, 5],
                            [6, 7, 8],
                            [0, 3, 6],
                            [1, 4, 7],
                            [2, 5, 8],
                            [2, 4, 6],
                            [0, 4, 8]];
    const getBoard = () => board;
    const initBoard = () => {
        for (let i=0; i<9; i++) {
            board[i] = null;
        }
    };
    const isLegalMove = (id) => {
        id = parseInt(id);
        if (board[id]) {
            return false;
        }
        return true;
    };
    const isGameOver = () => {
        for(let i=0; i<winningIndexes.length; i++) {
            let indexSet = winningIndexes[i];
            if (indexSet.every( val => board[val] === board[indexSet[0]])) {
                return board[indexSet[0]];
            }
        }
        return false;
    };
    const isDraw = () => {
        if (board.includes(null)) {
            return false;
        }
        return true;
    };
    const getResult = () => {
        let isOver = isGameOver();
        if (isOver) {
            return isOver;
        }
        if (isDraw()) {
            return "draw";
        }
        return false;
    };
    const updateBoard = (player) => {
        let index = parseInt(player.getChoice());
        let symbol = player.getSymbol();
        if (index >= 0 && index <= 8) {
            board[index] = symbol;
        }
        displayController.render();
    };
    return {
        getBoard,
        initBoard,
        getResult,
        updateBoard,
        isLegalMove,
    };
})();

const player = (name, symbol) => {
    let choice = null;
    const getName = () => name;
    const getSymbol = () => symbol;
    const setChoice = choice => this.choice = choice;
    const getChoice = () => this.choice;
    return {setChoice, getName, getSymbol, getChoice};
}

const displayController = (() => {
    const formModal = document.querySelector("#form-modal");
    const playDivs = Array.from(document.querySelectorAll(".space"));
    const messageWindow = document.querySelector("#dialog-box");
    const msgElement = document.querySelector("#message");
    const newRoundBtn = document.querySelector("#new-round");
    const newGameBtn = document.querySelector("#new-game");
    const turn = document.querySelector("#turn");
    const openFormModal = () => {
        formModal.style.display = "block";
    };
    const closeFormModal = () => {
        formModal.style.display = "none";
    };
    const displayPlayers = () => {
        
    };
    const getIcon = (symbol) => {
        let icon = document.createElement('i');
        icon.classList.add('fa');
        
        let symbolClass = symbol === 'X' ? 'fa-times' : 'fa-circle-o';
        icon.classList.add(symbolClass);
        icon.classList.add('fa-4x');

        return icon;
    };
    const initBoard = () => {
        //add event listeners to the board
        playDivs.forEach(div => {
            div.addEventListener('click', game.playRound);
        });
    };
    const deactivateBoard = () => {
        playDivs.forEach(div => {
            div.removeEventListener('click', game.playRound);
        });
    };
    const initNewGameBtns = () => {
        newRoundBtn.addEventListener('click', game.restart);
        newGameBtn.addEventListener('click', () => window.location.reload());
    }
    const render = () => {
        let board = gameBoard.getBoard();
        playDivs.forEach(div => {
            let index = div.id;
            if (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            if (board[index]) {
                div.appendChild(getIcon(board[index]));
            }
        })
    };
    const displayTurn = (name) => {
        turn.innerText = `${name}'s turn`;
    };
    const displayMessage = message => {
        messageWindow.style.display = "block";
        msgElement.innerHTML = message;
        turn.innerText = "";
    };
    const closeMessageWindow = () => {
        messageWindow.style.display = "none";
    }
    return {openFormModal, closeFormModal, displayPlayers, initBoard, render, displayMessage, deactivateBoard, initNewGameBtns, closeMessageWindow, displayTurn};
})();

const game = (() => {
    let player1 = {};
    let player2 = {};
    let turn = 0;
    const form = document.querySelector("#form");
    const getPlayer = id => id === 1 ? player1 : player2; 
    const restart = () => {
        gameBoard.initBoard();
        displayController.render();
        displayController.initBoard();
        displayController.closeMessageWindow();
        firstTurn();
    };
    const playRound = function () {
        if (gameBoard.isLegalMove(this.id)) {
            let player = turn ? player1 : player2;
            let nextPlayer = turn ? player2 : player1;
            displayController.displayTurn(nextPlayer.getName());
            turn = 1 - turn;
            player.setChoice(this.id);
            gameBoard.updateBoard(player);
            
            let result = gameBoard.getResult();
            if (result) {
                displayController.displayMessage(getMessage(result));
                displayController.deactivateBoard();
                displayController.initNewGameBtns();
            }
        }
    };
    const initGame = () => {
        event.preventDefault();
        setPlayers();
        // gameBoard.initBoard();
        displayController.initBoard();
        form.reset();
        displayController.closeFormModal();
        firstTurn();
        // turn = 1 - turn;
    };
    const firstTurn = () => {
        let player = turn ? player1 : player2;
        displayController.displayTurn(player.getName());
    }
    const init = () => {
        displayController.openFormModal();
        form.addEventListener('submit', initGame);
        // addEventListener(form, "submit", initGame);
    };
    const setPlayers = () => {
        let player1Name = document.querySelector("#player1").value;
        let player2Name = document.querySelector("#player2").value;
        player1 = player(player1Name, 'X');
        player2 = player(player2Name, 'O');
    };
    const getMessage = (result) => {
        let message = "";
        if (result === "draw") {
            message = "It's a draw!";
        } else {
            message = result === 'X' ? player1.getName() : player2.getName();
            message += " won the round!";
        }
        return message;
    };
    return {getPlayer, init, playRound, restart};
})();

game.init();