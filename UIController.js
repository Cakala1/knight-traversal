import Chessboard from "./knight.js";
const msgContainer = document.querySelector(".info");

const infoMessages = {
    start: "Click a field to set it as starting field",
    destination: "Click a field to set it as a destination field",
}

export default class UIController{
    isStartSet = false;
    isDestSet = false;
    chess = new Chessboard;
    start = [];
    destination = [];
    handleClick(e){
        if(e.target.classList.contains("chessboard-field")){
            if(this.isStartSet && this.isDestSet) this.resetBoard();
            if(!this.isStartSet){
                this.isStartSet = true;
                this.start = e.target.id.split("-").map(num => parseInt(num));
                e.target.classList.add("start-field");
                this.showMessage(infoMessages["destination"]);
            }
            else if(!this.isDestSet){
                let temp = e.target.id.split("-").map(num => parseInt(num));
                if(temp[0] === this.start[0] && temp[1] === this.start[1]) return;
                else{
                    this.isDestSet = true;
                    this.destination = temp;
                    e.target.classList.add("end-field");
                    this.calculateMoves();
                }
            }
        }
    }

    calculateMoves(){
        const steps = this.chess.knightMoves(this.start, this.destination);
        const msg = `Your knight needs ${steps.length - 1} steps.`
        this.showMessage(msg);
        for(let i = 1; i<steps.length; i++){
            let step = steps[i];
            const stepContainer = document.getElementById(step.join("-"));
            stepContainer.classList.add("move");
            stepContainer.innerText = i;
        }
    }

    showMessage(msg){
        msgContainer.textContent = msg;
    }

    resetBoard(){
        this.isStartSet = false;
        this.isDestSet = false;
        this.start = [];
        this.destination = [];
        this.showMessage(infoMessages["start"]);
        const allFields = document.querySelectorAll(".chessboard-field");
        for(let field of allFields){
            field.classList.remove("move");
            field.classList.remove("start-field");
            field.classList.remove("end-field");
            field.innerText = "";
        }
    }
}

