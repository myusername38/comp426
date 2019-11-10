export default class Game {
    constructor(size) {
       this.size = size; 
       this.board = new Array(size * size).fill(0);
       this.score = 0;
       this.won = false;
       this.over = false;
       this.moveCallbacks = [];
       this.loseCallbacks = [];
       this.winCallbacks = [];
       this.randomPosition();
       this.randomPosition();
   }

   randomNumber() {
       const num = Math.floor((Math.random() * 10));
       if (num < 9) {
           return 2; 
       }
       return 4;
   }

   randomPosition() {
       let openPositions = [];
       let count = 0;
       this.board.forEach(p => {
           if (p == 0) {
               openPositions[openPositions.length] = count;
           }
           count++;
       });
       const num = Math.floor((Math.random() * (openPositions.length)));
       this.board[openPositions[num]] = this.randomNumber();
   }

   move(direction) {
       let arry = [...this.board];
       switch (direction) {
           case 'right':
               this.onRight();
               break;
           case 'left':
               this.onLeft();
               break;
           case 'down':
               this.onDown();
               break;
           case 'up':
               this.onUp();
               break;
       }
       //this.toString();
       let count = 0; 
       let i = 0;
       for (i; i < this.size * this.size; i++) {
           if (this.board[i] != arry[i]) {
               this.randomPosition();
               break;
           }
       }
       this.moveCallbacks.forEach(c => {
           c(this.getGameState());
       });
       if (!this.won){
           i = 0;
           for (i; i < this.size * this.size; i++) {
               if (this.board[i] == 2048) {
                   this.won = true;
                   this.winCallbacks.forEach(c => {
                       c(this.getGameState());
                   });
               break;
               }
           }
       }
       i = 0;
       this.over = true;
       for (i; i < (this.size * this.size); i++) { 
           if (this.board[i] == 0) {
               this.over = false;
               // console.log(0);
               break;
           }
           //right
           if (i + 1 < (this.size * this.size) && ((i + 1) % this.size) != 0 && this.board[i] == this.board[i + 1]) {
               this.over = false;
               // console.log(`right ${i} ${this.board[i]} ${this.board[i + 1]}`);
               break;
           }
           //left
           if (i - 1 >= 0 && ((i - 1) % this.size) != (this.size -1) && this.board[i] == this.board[i - 1]) {
               this.over = false;
               // console.log('left');
               break;
           }
           //top
           if (i + this.size < (this.size * this.size) && this.board[i] == this.board[i + this.size]) {
               this.over = false;
               break;
           }
           //bottom
           if (i - this.size >= 0 && this.board[i] == this.board[i - this.size]) {
               this.over = false;
               // console.log('bottom');
               break;
           }
        }
       if (this.over) {
            this.loseCallbacks.forEach(c => {
                c(this.getGameState());
            });
        }
   }

   loadGame(gamestate) {
       this.board = gamestate.board;
       this.score = gamestate.score;
       this.won = gamestate.won;
       this.over = gamestate.over;
   }

   setupNewGame() {
       this.board = new Array(this.size * this.size).fill(0);
       this.score = 0;
       this.won = false;
       this.over = false;
       this.randomPosition();
       this.randomPosition();
   }

   onMove(callback) {
       this.moveCallbacks[this.moveCallbacks.length] = callback;
   }

   onLose(callback) {
      this.loseCallbacks[this.loseCallbacks.length] = callback;
   }

   onWin(callback) {
       this.winCallbacks[this.winCallbacks.length] = callback;
   }

   getGameState() {
       return {
           "board": this.board,
           "score": this.score,
           "won": this.won,
           "over": this.over
       }
   }

   onUp(){
       let count = 0;
       this.board.forEach(tile => {
           let i = 1;
           let current = count + this.size * i;
           while( current < (this.size * this.size) && this.board[count] == 0) {
               if (this.board[current] != 0) {
                   this.board[count] = this.board[current];
                   this.board[current] = 0;
                   break;
               } else {
                   i++;
                   current = count + this.size * i;
               }
           }
           count++;
       });
       //here
       count = 0;
       this.board.forEach(tile => {
           let i = 1;
           let current = count + this.size * i;
           if (current < (this.size * this.size) && this.board[count] != 0 && this.board[count] == this.board[current]) {
               this.board[count] = this.board[current] * 2;
               this.board[current] = 0;
               this.score += this.board[count];
               count ++;
           } else {
               count++;
           }
       });
       count = 0;
       this.board.forEach(tile => {
           let i = 1;
           let current = count + this.size * i;
           while( current < (this.size * this.size) && this.board[count] == 0) {
               if (this.board[current] != 0) {
                   this.board[count] = this.board[current];
                   this.board[current] = 0;
                   break;
               } else {
                   i++;
                   current = count + this.size * i;
               }
           }
           count++;
       });
   }

   onDown() {
       let checkTile = (this.size * this.size) - 1;
       this.board.forEach(tile => {
           let i = 1;
           let current = checkTile - (i * this.size);
           while (current >= 0 && this.board[checkTile] == 0) {
               if (this.board[current] != 0) {
                   this.board[checkTile] = this.board[current];
                   this.board[current] = 0;
                   break;
               } else {
                   i++;
                   current = checkTile - (i * this.size);
               }
           }
           checkTile--;
       });
       checkTile = (this.size * this.size) - 1;
       this.board.forEach(tile => {
           let i = 1;
           let current = checkTile - (i * this.size);
           if (current >= 0 && this.board[checkTile] != 0 && this.board[checkTile] == this.board[current]) {
               this.board[checkTile] = this.board[current] * 2;
               this.board[current] = 0;
               this.score += this.board[checkTile];
           }
           checkTile--;
       });
       checkTile = (this.size * this.size) - 1;
       this.board.forEach(tile => {
           let i = 1;
           let current = checkTile - (i * this.size);
           while (current >= 0 && this.board[checkTile] == 0) {
               if (this.board[current] != 0) {
                   this.board[checkTile] = this.board[current];
                   this.board[current] = 0;
                   break;
               } else {
                   i++;
                   current = checkTile - (i * this.size);
               }
           }
           checkTile--;
       });
   }

   onLeft() {
       let checkTile = 0;
       this.board.forEach(tile => {
           let rowPosition = checkTile % this.size;
           let i = 1; 
           while(rowPosition + i < this.size && this.board[checkTile] == 0 ) {
               if (this.board[checkTile + i] != 0) {
                   this.board[checkTile] = this.board[checkTile + i];
                   this.board[checkTile + i] = 0;
               }
               i++;
           }
           checkTile++;
       });
       checkTile = 0;
       this.board.forEach(tile => {
           let rowPosition = checkTile % this.size;
           let i = 1; 
           if ( checkTile < this.size * this.size && rowPosition + i < this.size && this.board[checkTile + 1] == this.board[checkTile] && this.board[checkTile] != 0) {
               this.board[checkTile] = this.board[checkTile] * 2;
               this.board[checkTile + i] = 0;
               this.score += this.board[checkTile];
               checkTile += 2;
           } else {
               checkTile++;
           }
       });
       checkTile = 0;
       this.board.forEach(tile => {
           let rowPosition = checkTile % this.size;
           let i = 1; 
           while(rowPosition + i < this.size && this.board[checkTile] == 0 ) {
               if (this.board[checkTile + i] != 0) {
                   this.board[checkTile] = this.board[checkTile + i];
                   this.board[checkTile + i] = 0;
               }
               i++;
           }
           checkTile++;
       });
   }

   onRight() {
       let checkTile = (this.size * this.size) - 1;
       this.board.forEach(tile => {
           let rowPosition = checkTile % this.size;
           let i = 1; 
           while(rowPosition - i >= 0 && this.board[checkTile] == 0 ) {
               if (this.board[checkTile - i] != 0) {
                   this.board[checkTile] = this.board[checkTile - i];
                   this.board[checkTile - i] = 0;
               }
               i++;
           }
           checkTile--;
       });
       checkTile = (this.size * this.size) - 1;
       this.board.forEach(tile => {
           let rowPosition = checkTile % this.size;
           let i = 1; 
           if (checkTile >= 0 && rowPosition - i >= 0 && this.board[checkTile - i] == this.board[checkTile] && this.board[checkTile] != 0) {
               this.board[checkTile] = this.board[checkTile] * 2;
               this.board[checkTile - i] = 0;
               this.score += this.board[checkTile];
               checkTile -= 2;
           } else {
               checkTile--;
           }
       });
       checkTile = (this.size * this.size) - 1;
       this.board.forEach(tile => {
           let rowPosition = checkTile % this.size;
           let i = 1; 
           while(rowPosition - i >= 0 && this.board[checkTile] == 0 ) {
               if (this.board[checkTile - i] != 0) {
                   this.board[checkTile] = this.board[checkTile - i];
                   this.board[checkTile - i] = 0;
               }
               i++;
           }
           checkTile--;
       });
   }

   toString() {
       let output = "";
       let count = 0;
       output += `Score: ${this.score} won ${this.won} over: ${this.over}\n`;
       this.board.forEach(tile => {
           output += `[${tile}]`
           if (count % this.size == this.size -1) {
               output += '\n';
           } 
           count++;
       });
       return output;
   }
}