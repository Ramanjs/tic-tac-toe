const gameBoard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];
    const isGameOver = () => {
        
    };
    const isDraw = () => {
        
    };
    const updateBoard = (symbol, index) => {
        if (typeof index === "number" && index >= 0 && index <= 8) {
            board[index] = symbol;
        }
    };
    const isLegalMove = (id) => {
        id = parseInt(id);
        if (board[id]) {
            return false;
        }
        return true;
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
    const playDivs = document.querySelectorAll(".space");
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
        
    };
    return {openForm, closeForm, displayPlayers, initBoard};
})();

const game = (() => {
    let player1 = {};
    let player2 = {};
    let turn = 0;
    const form = document.querySelector('#form');
    // const addEventListener = (element, evnt, funct) => {
    //     element.addEventListener(evnt, funct);
    // };
    const restart = () => {

    };
    const playRound = () => {
        if (gameBoard.isLegalMove(this.id)) {
            let player = turn ? player1 : player2;
            turn = 1 - turn;
            player.setChoice(this.id);
            gameBoard.updateBoard(player);

            if (gameBoard.isGameOver()) {
                displayController.gameOver();
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
    const initForm = () => {
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
    return {initForm, playRound};
})();

game.initForm();