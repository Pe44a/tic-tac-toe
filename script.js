const Gameboard = (function() {
    
    const Player = (symbol) => {
        const getSymbol = () => symbol;
        return {getSymbol};
    }

    let gameboard = ['x','x','x','x','','','',''];

    const render = (function() {
        const fields = document.querySelectorAll('.field');

        fields.forEach((field, index) => {
            field.textContent = gameboard[`${index}`];
        });
    })();
})();

    const gameFlow = (function() {
})();