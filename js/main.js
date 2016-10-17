const View = require("./ttt-view.js")
const Game = require("../lib/game.js")



$( () => {
  let game = new Game();
  let view = new View(game, $("figure"));
  view.setupBoard();
  view.bindEvents();


});
