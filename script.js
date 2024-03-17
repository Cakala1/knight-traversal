import UIController from "./UIController.js";
const chessboard = document.querySelector(".chessboard");

const ui = new UIController;
chessboard.addEventListener("click", (e) => ui.handleClick(e));