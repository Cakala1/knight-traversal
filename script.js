class Chessboard{
    constructor(){
        this.createMoves();
    }
    moves = {}

    createMoves(){
        for(let i = 0; i<8; i++){
            for(let j=0; j<8; j++){
                const move = [i, j];
                const currMoves = [];
                if(i + 1 <= 7){
                    if(j + 2 <= 7) currMoves.push([i+1, j+2]);
                    if(j - 2 >= 0) currMoves.push([i+1, j-2]);
                }
                if(i - 1 >= 0){
                    if(j + 2 <= 7) currMoves.push([i-1, j+2]);
                    if(j - 2 >= 0) currMoves.push([i-1, j-2]);
                }
                if(i + 2 <= 7){
                    if(j + 1 <= 7) currMoves.push([i+2, j+1]);
                    if(j - 1 >= 0) currMoves.push([i+2, j-1]);
                }
                if(i - 2 >= 0){
                    if(j + 1 <= 7) currMoves.push([i-2, j+1]);
                    if(j - 1 >= 0) currMoves.push([i-2, j-1]);
                }
                this.moves[move] = currMoves;
            }
        }
    }

    knightMoves(start, destination){
        const destStr = `${destination[0]},${destination[1]}`;
        const bfsInfo = {};
        const queue = [];
        const steps = [];
        queue.push(start);
        bfsInfo[start] = {distance: 0, predecessor: null};
        while(queue.length > 0){
            const curr = queue[0];
            for(let val of this.moves[curr]){
               queue.push(val);
                const valStr = `${val[0]},${val[1]}`;
                if(!Object.keys(bfsInfo).includes(valStr)){
                    bfsInfo[val] = {distance: bfsInfo[curr].distance + 1, predecessor: curr};
                }
                if(valStr === destStr){
                    console.log(`STEPS: ${bfsInfo[valStr].distance}`);
                    let prev = bfsInfo[valStr];
                    steps.push(valStr.split(",").map(val => parseInt(val)));
                    while(prev.predecessor){
                        steps.push(prev.predecessor);
                        prev = bfsInfo[prev.predecessor];
                    }
                    steps.reverse();
                    return steps;
                }
            }
            queue.shift();
        }
    }
}


const chess = new Chessboard();
const result = chess.knightMoves([7,7], [0, 0]);
console.log(result);