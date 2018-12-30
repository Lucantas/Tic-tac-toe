const Board = function() {
    this.row = document.querySelector("[data-template=row]");
    this.boardElement = document.getElementById("gameBoard"),  
    this.width = 3,
    this.height = 3,
    this.draw = () => {
        let newRow,tile = null;
        this.boardElement.innerHTML = "";
        for (let i = 0; i < this.width;i++){
            newRow = this.row.cloneNode();            
            newRow.setAttribute("data-template", "null")
            newRow.setAttribute("data-index", "row" + i)
            this.boardElement.appendChild(newRow.cloneNode());
            for (let j = 0; j < this.height; j++){
                tile = this.row.querySelector("[data-id=tile].hidden").cloneNode();
                tile.dataset.tileIndex = "tile" + j;
                tile.classList.remove("hidden");
                tile.appendChild(document.createElement("i"));
                this.boardElement.querySelector(`[data-index=row${i}]`).appendChild(tile);                
            }
        }
    }    
}


function setMarker(tile){
    var _i = tile.querySelector("i");
    if (tile.dataset.marker == "empty"){
        _i.className = tileStates[app.match.players.current];
        tile.dataset.marker = "filled";
        tile.dataset.state = app.match.players.current;        
        if(!app.match.checkMove(tile)) app.match.players.toggle();
        else app.handleWin();
    }
}

const Match = function(){
    this.states = {
        x:"x",
        o:"o"
    },  
    this.players = {
        current : this.states.o,
        toggle : () => {
            if(this.players.current == this.states.o){
                this.players.current = this.states.x;
            } else {
                this.players.current = this.states.o;
            }
        }
    }
    this.rows = document.querySelectorAll("[data-id=row]"),
    this.checkMove = (tile) => {        
        let thisState = tile.dataset.state;
        // is the tile's row filled with that state
        let thisRowWithState = tile.closest("[data-id=row]")
            .querySelectorAll(`[data-id=tile][data-state=${app.match.players.current}]`);
        if(thisRowWithState != null && thisRowWithState.length == 3){
            return true;
        }   

        // is the tile's collumn filled with that state
        let thisColumnWithState = tile.closest("[data-id=row]").querySelectorAll("[data-id=tile]");
        let tileIndex = Array.prototype.indexOf.call(thisColumnWithState,tile);
        let stateInCollumn = 0;
        document.querySelectorAll(`[data-tile-index=tile${tileIndex}]`).forEach((rowTile, index) => {
            if(rowTile.dataset.state == thisState){
                stateInCollumn++;
            }            
        });
        
        if (stateInCollumn > 2){
            return true;
        }

        // are the tile's diagonals filled with that state

        let stateInDiagonals = 0;

        // get the current rowIndex and tileIndex
        let rowIndex = parseInt(tile.closest("[data-id=row]").dataset.index.split("row")[1]);

        if (isDiagonal(rowIndex,tileIndex)){
            switch(tileIndex){
                case 0:
                    if(rowIndex < this.rows.length - 2){
                        if(
                            this.rows[rowIndex + 1].querySelector(`[data-tile-index=tile${tileIndex + 1}]`).dataset.state == thisState
                        ){
                            stateInDiagonals++;
                        }
                        if(
                            this.rows[rowIndex + 2].querySelector(`[data-tile-index=tile${tileIndex + 2}]`).dataset.state == thisState
                        ){
                            stateInDiagonals++;
                        }
                    } 
                    
                    else {
                        if(
                            this.rows[rowIndex - 1].querySelector(`[data-tile-index=tile${tileIndex + 1}]`).dataset.state == thisState
                        ){
                            stateInDiagonals++;
                        }
                        if(
                            this.rows[rowIndex - 2].querySelector(`[data-tile-index=tile${tileIndex + 2}]`).dataset.state == thisState
                        ){
                            stateInDiagonals++;
                        } 
                    }

                    break;
                case 1:
                    if(
                        this.rows[rowIndex - 1].querySelector(`[data-tile-index=tile${tileIndex - 1}]`).dataset.state == thisState
                    ){
                        stateInDiagonals++;
                    }
                    if(
                        this.rows[rowIndex - 1].querySelector(`[data-tile-index=tile${tileIndex + 1}]`).dataset.state == thisState
                    ){
                        
                    }
                    if(
                        this.rows[rowIndex + 1].querySelector(`[data-tile-index=tile${tileIndex + 1}]`).dataset.state == thisState
                    ){
                        stateInDiagonals++;
                    }
                    if(
                        this.rows[rowIndex + 1].querySelector(`[data-tile-index=tile${tileIndex - 1}]`).dataset.state == thisState
                    ){
                        stateInDiagonals++;
                    }
                    break;
                case 2:
                    if (rowIndex > 1){
                        if(
                            this.rows[rowIndex - 1].querySelector(`[data-tile-index=tile${tileIndex - 1}]`).dataset.state == thisState   
                        ){
                            stateInDiagonals++;
                        }
                        if(
                            this.rows[rowIndex - 2].querySelector(`[data-tile-index=tile${tileIndex - 2}]`).dataset.state == thisState   
                        ){
                            stateInDiagonals++;
                        }
                    } else {
                        if(
                            this.rows[rowIndex + 1].querySelector(`[data-tile-index=tile${tileIndex - 1}]`).dataset.state == thisState   
                        ){
                            stateInDiagonals++;
                        }
                        if(
                            this.rows[rowIndex + 2].querySelector(`[data-tile-index=tile${tileIndex - 2}]`).dataset.state == thisState   
                        ){
                            stateInDiagonals++;
                        }
                    }
                    break;
            }

        }

        if(stateInDiagonals > 1){
            return true;
        }

        // it's a draw
        if (!document.querySelectorAll("[data-id=tile][data-marker=empty]").length){
            app.handleDraw();
        }
    }
}

function isDiagonal(rowIndex,tileIndex){
    if(rowIndex == tileIndex) return true;

    if(rowIndex == 0 && tileIndex == 2){
        return true;
    } 

    if(rowIndex == 2 && tileIndex == 0){
        return true;
    }
}

const tileStates = {
    x : "fas fa-times font-8em",
    o : "far font-6em fa-circle pad-top-18"
}