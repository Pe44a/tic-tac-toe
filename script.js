const Player = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol};
}

const Gameboard = (() => {
    let lastSymbol;
    let gameboard = ['','','','','','','',''];
    const fields = document.querySelectorAll('.field');

    const render = () => {
        fields.forEach((field, index) => {
            field.textContent = gameboard[`${index}`];
        });
    };

    const reset = () => {
        gameboard = ['','','','','','','',''];
        render();
        lastSymbol = null;
        return {gameboard};
    }

    const toggleBoard = () => {
        fields.forEach((field) => {
            field.classList.toggle('disable');
        });
    }

    const addSymbol = () => {
        fields.forEach((field, index) => {
            field.addEventListener('click', (e) => {
                //If its already taken you can't place
                if(e.target.textContent) {
                   return; 
                }

                if(lastSymbol === 'x'){
                    gameboard[`${index}`] = gameFlow.player2.getSymbol();
                    render();
                        lastSymbol = gameFlow.player2.getSymbol();
                } else {
                    gameboard[`${index}`] = gameFlow.player1.getSymbol();
                    render();
                        lastSymbol = gameFlow.player1.getSymbol();
                }
                //After placement checks who has won
                gameFlow.checkWin(gameboard, lastSymbol);
            });
        });
        
    }

    fields.forEach(field => {
        field.addEventListener('click', addSymbol());
    });

    return {toggleBoard,
            reset
        };

})();

const gameFlow = (() => {
    const player1 = Player('x');
    const player2 = Player('o');
    const displayResult = document.querySelector('.result');
    const resetButton = document.querySelector('#reset');
    let result;



    const checkWin = (board, symbol) => {

        if((board[0] === symbol & board[1] === symbol & board[2] === symbol) ||
           (board[3] === symbol & board[4] === symbol & board[5] === symbol) ||
           (board[6] === symbol & board[7] === symbol & board[8] === symbol) ||
           (board[0] === symbol & board[3] === symbol & board[6] === symbol) ||
           (board[1] === symbol & board[4] === symbol & board[7] === symbol) ||
           (board[2] === symbol & board[5] === symbol & board[8] === symbol) ||
           (board[0] === symbol & board[4] === symbol & board[8] === symbol) ||
           (board[2] === symbol & board[4] === symbol & board[6] === symbol)
        ) {
            result = `${symbol} player won`;
            Gameboard.toggleBoard();
            displayResult.textContent = result;
            return {result};
        }

        //Checks if its a draw
        if(board[0] !== '' & board[1] !== '' & board[2] !== '' & board[3] !== '' & 
           board[4] !== '' & board[5] !== '' & board[6] !== '' & board[7] !== '' & board[8] !== '' ) {
            result = `It's a draw`;
            displayResult.textContent = result;
            return {result};
        }
    };


    resetButton.addEventListener('click', () => {
        Gameboard.reset();
        //Only disables field when there have been a match
        if(result) {
        Gameboard.toggleBoard();
    }
        displayResult.textContent = ' ';
        result = null;
    });

    return {
        player1,
        player2,
        checkWin
    };
})();