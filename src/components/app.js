(window).onload = () => {
    app = new App();
    match = new Match();
    app.start();    
}

var app;
var match;


const App = function(){     
    this.board = null, 
    this.newGame = () => {
        if (this.board == null) this.board = new Board();
        this.board.draw();
    }
    this.start = () => {
        this.newGame();
    }
    this.handleWin = () =>{
        alert("Player " + match.players.current + " Won the Match!");
        this.start();
    }
    this.handleDraw = () => {
        alert("No one won the match!");
        this.start();
    }
}