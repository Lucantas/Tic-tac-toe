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
                console.log(tile)
                tile.appendChild(document.createElement("i"));
                this.boardElement.querySelector(`[data-index=row${i}]`).appendChild(tile);                
            }
        }
    }    
}


function setMarker(tile){
    var _i = tile.querySelector("i");
    if (tile.dataset.marker == "empty"){
        _i.className = tileStates[match.players.current];
        tile.dataset.marker = "filled";
        tile.dataset.state = match.players.current;        
        if(!match.checkMove(tile)) match.players.toggle();
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
            .querySelectorAll(`[data-id=tile][data-state=${match.players.current}]`);
        if(thisRowWithState != null && thisRowWithState.length == 3){
            return true;
        }   

        // is the tile's collumn filled with that state
        let thisColumnWithState = tile.closest("[data-id=row]").querySelectorAll("[data-id=tile]");
        let rowIndex = Array.prototype.indexOf.call(thisColumnWithState,tile);
        let stateInCollumn = 0;
        document.querySelectorAll(`[data-tile-index=tile${rowIndex}]`).forEach((rowTile, index) => {
            if(rowTile.dataset.state == thisState){
                stateInCollumn++;
            }            
        });
        
        if (stateInCollumn > 2){
            return true;
        }

        // are the tile's diagonals filled with that state

        let stateInDiagonals;

        for (let i = 0; i<this.rows.length; i++) {
            if (this.rows[i] != tile.closest("[data-id=row]")){
                let matchTile = this.rows[i].querySelector(`[data-id=tile][data-state=${thisState}]`);
                if (matchTile != null){
                    let tileIndex = Array.prototype.indexOf.call(matchTile);
                    switch(tileIndex){
                        case rowindex -1:
                        case rowindex + 1:
                        case rowindex - 2:
                        case rowindex + 2:
                            stateInDiagonals++;
                    }
                }
            }
        }

        if(stateInDiagonals > 2){
            return true;
        }

        // it's a draw
        if (!document.querySelectorAll("[data-id=tile][data-marker=empty]").length){
            app.handleDraw();
        }
    }
}

const tileStates = {
    x : "fas fa-times font-8em",
    o : "far font-6em fa-circle pad-top-18"
}