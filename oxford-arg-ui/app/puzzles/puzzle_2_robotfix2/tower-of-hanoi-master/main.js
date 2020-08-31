//TODO:
// [ ] solver
// [ ] display the minimum number of moves
// [x] toggle start and reset button text
//QUESTIONS:
// should I daisy chain my methods, or have them call in sequence?
// should I use `this.` or `game.`? I'm assuming that when I get more OOJS about it, `this` would be easier to work with.
import $ from "jquery";

async function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

(async function() {



while($(".col").length == 0) {
  await wait(1000);
  console.log("loop")
}

var $columns = $(".col");
var $winningColumns = $(".c2,.c3");
var $rings;
var $c1 = $(".c1");
var $c2 = $(".c2");
var $c3 = $(".c3");
var $moves = $(".moves");
var $reset = $("#reset");
var $levelButton = $("#levelButton");
var $arrows = $(".arrow");

var game = {
  rings: 4,
  moves: 0,
  active: false,
  originCol: {},
  targetCol: {},
  moverId: 0,
  targetId: 0,
  over: true,
  registerEvents: function () {
    // clicking on a colum
    $columns.on("click", function () {
      if (!game.over) {
        game.click($(this));
      }
    });

    // hovering over a column
    $(".col").mouseenter(function () {
      if (!game.active) {
        $(this).children(".ring").eq(0).addClass("hover");
      } else {
        game.moveRing($(this));
      }
    });

    // leaving a column
    $(".col").mouseleave(function () {
      $(this).children(".ring").eq(0).removeClass("hover");
    });

    // clicking pick level
    $levelButton.on("click", function () {
      game.displayLevelSelector();
    });

    // clicking reset
    $reset.on("click", function () {
      // why didn't this work when I did `$reset.on('click', game.reset)` ?
      game.reset();
    });

    // clicking level-select arrows
    $c2.on("click", ".arrow", function () {
      game.selectLevel($(this));
    });
  },
  click: function (clicked) {
    var clickedRing = clicked.children(".ring").eq(0);
    if (!this.active) {
      // if a ring is NOT already selected...
      this.originCol = clicked;
      clickedRing.addClass("active");
      this.moverId = parseInt(clickedRing.attr("id"));
      this.active = true;
    } else if (this.checkMove(clicked)) {
      // if a ring IS selected, handle moving a ring
      game.moveRing(clicked);
      this.softReset();
      this.incrementCounter();
      this.checkWin();
    }
  },
  checkMove: function (target) {
    this.targetCol = target;
    // select eq(1) because we need to ignore the floating ring
    var targetRing = target.children().eq(1);
    this.targetId = targetRing.hasClass("ring")
      ? parseInt(targetRing.attr("id"))
      : -100;
    if (this.originCol.attr("class") == this.targetCol.attr("class")) {
      // SAME SPACE
      this.softReset();
      return false;
    } else if (this.moverId > this.targetId) {
      // LEGAL MOVE
      return true;
    } else {
      // ILLEGAL MOVE
      game.targetCol = game.originCol;
      this.rumble();
      return false;
    }
  },
  rumble: function () {
    $(".active").addClass("rumble");
    $columns.on("animationend", ".rumble", function () {
      $(this).removeClass("rumble");
    });
  },
  moveRing: function (destination) {
    console.log("ring moved")
    $(".active").prependTo(destination);
  },
  incrementCounter: function () {
    this.moves++;
    $moves.html("moves: " + this.moves);
  },
  softReset: function () {
    this.active = false;
    $rings.removeClass("active hover");
  },
  checkWin: function () {
    $winningColumns.each(function (column) {
      if ($(this).children().length == game.rings) {
        game.gameOver();
        return false;
      }
    });
  },
  gameOver: function () {
    this.over = true;
    var perfect = Math.pow(2, this.rings) - 1;
    $(".c2").prepend("<div class='gameOver report'></div>");
    console.log(
      "tower of hanoi, this should interface with an object that handles flags and completion"
    );
  },
  reset: function () {
    console.log("reset")
    // this will be better when I can just make another instance with a constructor function, right?
    $columns.children().remove();
    this.generateRings(this.rings);
    this.over = false;
    this.softReset();
    this.moves = 0;
    this.moverId = 0;
    this.targetId = 0;
    this.targetCol = {};
    this.originCol = {};
    $moves.html("MOVES: " + this.moves);
    $reset.html("RESET");
    $(".level-select").remove();
    $(".gameOver").remove();
    $levelButton.show();
  },
  selectLevel: function (arrow) {
    var $level = $(".level");
    if (arrow.hasClass("left")) {
      if (this.rings > 3) {
        this.rings--;
      }
    } else if (this.rings < 15) {
      this.rings++;
    }
    $level.html(this.rings);
    this.generateRings(this.rings);
  },
  displayLevelSelector: function () {
    $reset.html("START");
    $levelButton.hide();
    this.over = true;
    const instructions =
      "To fix ViriDOS, get the entire red tower onto one of the other 2 columns, one block at a time. You can move a block by clicking it and clicking on the column you want to move it to (no dragging). A larger block cannot be placed atop a smaller block, so be careful.";
    var $levelSelect = $(
      "<div class='level-select' style='position: absolute; margin: auto; top: 25%; width: 50%; font-size: 120%'><p style='text-shadow: 0px 0px 15px #000000; text-align: center'>" + instructions + "</p>"
    );
    $columns.children().remove();
    $c2.append($levelSelect);
    $(".level").html(this.rings);
    this.generateRings(this.rings);
  },
  generateRings: function (n) {
    $c1.children().remove();
    // this.rings = n;
    var multiplier = 1 / n;
    var width;
    for (var i = 0; i < n; i++) {
      width = 100 - i * multiplier * 100 + "%";
      $c1.prepend('<div class="ring"></div>');
      $c1
        .children()
        .eq(0)
        .attr("id", i + 1);
      $c1.children().eq(0).css("width", width);
    }
    // reset this variable to account for all rings
    $rings = $(".ring");
    // hard code height of all rings to flex doesn't mess with really tall towers
    $rings.height($rings.height());
  },
};

game.registerEvents();
game.displayLevelSelector();
})();