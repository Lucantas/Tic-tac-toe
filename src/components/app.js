(window).onload = () => {
    app = new App();
    app.start();    
}

var app;
var match;


const App = function(){     
    this.board = null, 
    this.match = null,
    this.newGame = () => {
        if (this.board == null) this.board = new Board();

        this.board.draw();

        if(this.match == null) this.match = new Match();

        this.match.rows = document.querySelectorAll("[data-id=row]")
    },
    this.start = () => {
        this.newGame();
    },
    this.handleWin = () =>{
        alert("Player " + this.match.players.current + " Won the Match!");
        this.start();
    },
    this.handleDraw = () => {
        alert("No one won the match!");
        this.start();
    }
}