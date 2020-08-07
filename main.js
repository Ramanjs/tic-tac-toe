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
            return isGameOver;
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
    const openForm = () => {
        formModal.style.display = "block";
    };
    const closeForm = () => {
        formModal.style.display = "none";
    };
    const displayPlayers = () => {
        
    };
    const initBoard = () => {
        //add event listeners to the board
        playDivs.forEach(div => {
            div.addEventListener('click', game.playRound);
        });
    };
    const render = () => {
        let board = gameBoard.getBoard();
        playDivs.forEach(div => {
            let index = div.id;
            if (board[index]) {
                div.innerText = board[index];
            }
        })
    };
    const gameOver = result => {
        let message = "";
        if (result === "draw") {
            message = "draw";
        } else {
            message = result === 'X' ? `${game.getPlayer(1).getName()} won` : `${game.getPlayer(2).getName()} won`;
        }
        window.alert(message);
    };
    return {openForm, closeForm, displayPlayers, initBoard, render, gameOver};
})();

const game = (() => {
    let player1 = {};
    let player2 = {};
    let turn = 0;
    const form = document.querySelector('#form');
    // const addEventListener = (element, evnt, funct) => {
    //     element.addEventListener(evnt, funct);
    // };
    const getPlayer = id => id === 1 ? player1 : player2; 
    const restart = () => {

    };
    const playRound = function () {
        if (gameBoard.isLegalMove(this.id)) {
            let player = turn ? player1 : player2;
            turn = 1 - turn;
            player.setChoice(this.id);
            gameBoard.updateBoard(player);

            let result = gameBoard.getResult();
            if (result) {
                displayController.gameOver(result);
            }
        }
    };
    const initGame = () => {
        event.preventDefault();
        setPlayers();
        displayController.initBoard();
        form.reset();
        displayController.closeForm();
    };
    const init = () => {
        displayController.openForm();
        form.addEventListener('submit', initGame);
        // addEventListener(form, "submit", initGame);
    };
    const setPlayers = () => {
        let player1Name = document.querySelector("#player1").value;
        let player2Name = document.querySelector("#player2").value;
        player1 = player(player1Name, 'X');
        player2 = player(player2Name, 'O');
    };
    return {getPlayer, init, playRound};
})();

game.init();