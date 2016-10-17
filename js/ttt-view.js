function makePos(string) {
  return string.split(',').map((el) => parseInt(el));
}

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents() {
    let $squares = $(".square");
    for (let square of $squares) {
      // set up listener for hovering
      $(square).hover(() => {
        $(square).css("background-color", "yellow");
      }, () => {
        $(square).css("background-color", "");
      });
      // set clicker listener
      $(square).on('click', event => {
        this.makeMove($(square));
      });
    }
  }

  makeMove($square) {
    let pos = makePos($square.data('pos'));
    if ($square.hasClass('markedSquare')) {
      alert('Invalid Move');
    } else {
      this.game.playMove(pos);
      $square.addClass("markedSquare");
      $square.text(this.game.currentPlayer);
      // check win
      if (this.game.isOver()) {
        if (this.game.winner()) {
          const h1 = $("<h1>").text(`${this.game.currentPlayer} has won!`);
          this.$el.append(h1);
        } else {
          const h1 = $("<h1>").text("nobody wins!");
          this.$el.append(h1);
        }
      }
    }
  }

  setupBoard() {
    let $ul = $('<ul></ul>');
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let $li = $(`<li class="square" data-pos="${i},${j}"></li>`);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
