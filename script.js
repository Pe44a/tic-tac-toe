const Player = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol};
}

const player1 = Player('x');
const player2 = Player('o');

const Gameboard = (() => {
    let gameboard = ['','','','','','','',''];
    let lastSymbol;
    const fields = document.querySelectorAll('.field');

    const render = () => {
        fields.forEach((field, index) => {
            field.textContent = gameboard[`${index}`];
        });
    };


    
    const addSymbol = () => {
        fields.forEach((field, index) => {
            field.addEventListener('click', (e) => {
                if(e.target.textContent) {
                   return; 
                }

                if(lastSymbol === 'x'){
                    gameboard[`${index}`] = player2.getSymbol();
                    render();
                        lastSymbol = player2.getSymbol();
                } else {
                    gameboard[`${index}`] = player1.getSymbol();
                    render();
                        lastSymbol = player1.getSymbol();
                }
            });
        });
    }

    fields.forEach(field => {
        field.addEventListener('click', addSymbol());
    })

})();

const gameFlow = (() => {

})();