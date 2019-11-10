import Game from './engine/game.js';

export const buildBoard = function(size, gameboard, score) {
    let i = 0;
    let board = `
        <div class="mt-lg">
            <div class="gameboard p-sm">
                <h1 class="title mt-xs mb-xs mlr-auto">2048</h1>
                <h2 class="sub-title mt-xs mb-xs mlr-auto">Score: ${ score }</h2>
    `;
    let count = 0;
    for (i; i < size; i++) {
        board += '<div class="gamerow fade-in-fast">'
        let j = 0; 
        for (j; j < size; j++ ) {
            let tile = '';
            if (gameboard[count]) {
                tile = gameboard[count];
                board += `<div class="gameTile filled"><p class="fade-in-fast">${ tile }</p></div>`
            } else {
                board += `<div class="gameTile empty"><p class="fade-in-fast">${ tile }</p></div>`
            }
            count++;
        }
        board += '</div>'
    }
    board += `
    <button class="mt-sm" id="start-game">
        <div class="mt-sm play-button pl-xs pr-xs">
            <h1 class="title mt-xs mb-xs">Reset</h1>
        </div>
    </button>
    `
    board += '</div>'
    board += `
        <div class="howTo mlr-auto">
            <h2 class="sub-title mlr-auto">How to Play</h2>
            <p class="mlr-auto">Use the arrow keys to move the tiles around the board. When two tiles touch that have the same number, they combine into one tile! 
            Try to make it to the 2048 tile or just see how long you can last!
            </p>
        </div>
    </div>
    `
    return board; 
}
export const renderStart = function() {
    return (`
    <div class="info-box mlr-auto">
        <h1 class="title mt-xs mb-xs mlr-auto">2048</h1>
        <h2 class="sub-title mt-xs mb-xs mlr-auto">Board size?</h2>
        <input id="bord-size" class="input mlr-atuo" type="number" value="4">
        <button class="mt-sm" id="start-game">
            <div class="mt-sm play-button pl-xs pr-xs">
                <h1 class="title mt-xs mb-xs">Play!</h1>
            </div>
        </button>
    </div>
    `);
}

export const endGame = function(gamestate) {
    return (`
    <div class="gameboard p-sm">
        <h1 class="title mt-xs mb-xs mlr-auto">2048</h1>
        <h2 class="sub-title mt-xs mb-xs mlr-auto">Score: ${ gamestate.score }</h2>
        <h2 class="sub-title mt-xs mb-xs mlr-auto">Game Over</h2>
        <button class="mt-md" id="start-game">
            <div class="mt-sm play-button pl-xs pr-xs">
                <h1 class="title mt-xs mb-xs">Restart?</h1>
            </div>
        </button>
    </div>
    `);
}

export const wonGame = function(gamestate) {
    return (`
    <div class="gameboard p-sm">
        <h1 class="title mt-xs mb-xs mlr-auto">2048</h1>
        <h2 class="sub-title mt-xs mb-xs mlr-auto">Score: ${ gamestate.score }</h2>
        <h2 class="sub-title mt-xs mb-xs mlr-auto">Congradulations You Won!</h2>
        <button class="mt-md" id="continue">
            <div class="mt-sm play-button pl-xs pr-xs">
                <h1 class="title mt-xs mb-xs">Continue?</h1>
            </div>
        </button>
        <button class="mt-md" id="end">
            <div class="mt-sm play-button pl-xs pr-xs">
                <h1 class="title mt-xs mb-xs">End Game?</h1>
            </div>
        </button>
    </div>
    `);
}

$(function() {
    let size = 0;
    let won = false;
    let game = null;
    const $root = $('#main');
    $root.html(renderStart());
    $(document).on('click', '#start-game', function(event) { 
        // console.log('start');
        if (!size) {
            size = document.getElementById('bord-size').value;
        }
        if (size < 2) {
            alert(`Board size ${ size } is too small. Size must be 2 or greater!`);
            size = 0;
        } else {
            won = false;
            if (game) {
                game.setupNewGame();
            } else {
                game = new Game(size);
            }
            $root.html(buildBoard(size, game.getGameState().board, game.getGameState().score));
        }
    });
    
    $(document).on('keydown' , e => {
        e.preventDefault();
        let tiles = document.getElementsByClassName('gameTile');
        if (game && tiles[0]) {
            switch (e.keyCode) {
                case 37:
                    game.move('left')
                    break;
                case 38:
                    game.move('up');
                    break;
                case 39:
                    game.move('right');
                    break;
                case 40:
                    //console.log('down');
                    game.move('down');
                    break;
            }
            $root.html(buildBoard(size, game.getGameState().board, game.getGameState().score));
            //console.log(game.getGameState().over);
            if (game.getGameState().over) {
                $root.html(endGame(game.getGameState()));
            }
            if (game.getGameState().won && !won) {
                won = true;
                $root.html(wonGame(game.getGameState()));
            }
        }
    });

    $(document).on('click', '#continue', function(event) {  
        $root.html(buildBoard(size, game.getGameState().board, game.getGameState().score));
    });

    $(document).on('click', '#end', function(event) {  
        $root.html(endGame(game.getGameState()));
    });
});
