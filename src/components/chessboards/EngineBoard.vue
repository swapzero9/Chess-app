<template>
  <div>
    <div id="engine-board" @click.exact="highlightSquare" @click.ctrl.prevent="removeHighlight"></div>
    <div class="buttons">
      <button @click="removeHighlight">Remove Highlighting</button>
      <button @click="movePop">unmake move</button>
      <button @click="moveFor">move forw</button>
    </div>
  </div>
</template>

<script>
import ChessBoard from "chessboardjs-vue";
import Chess from "chess.js";

let board;

export default {
  name: "EngineBoard",
  mounted() {
    board = ChessBoard("engine-board", {
      draggable: false,
    });
    board.start();
  },
  data() {
    return {
      chessHistory: Array,
      index: Number,
    };
  },
  props: {
    gamePgn: String
  },
  methods: {
    timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    movePop() {
      if (this.index > 0) {
        this.index--;
        board.position(this.chessHistory[this.index]);
      }
    },
    moveFor() {
      if (this.index < this.chessHistory.length) {
        this.index++;
        board.position(this.chessHistory[this.index]);
      }
    },
    highlightSquare(e) {
      if (e.target.classList.contains("square-55d63")) {
        if (e.target.classList.contains("highlighted"))
          e.target.classList.remove("highlighted");
        else {
          e.target.classList.add("highlighted");
        }
      } else if (e.path[1].classList.contains("square-55d63")) {
        if (e.path[1].classList.contains("highlighted"))
          e.path[1].classList.remove("highlighted");
        else {
          e.path[1].classList.add("highlighted");
        }
      }
    },
    removeHighlight() {
      let dd = document.getElementsByClassName("square-55d63");
      for (let d of dd) {
        d.classList.remove("highlighted");
      }
    },
    setupGame(pgn) {
      this.chessHistory = []
      let game = Chess()
      game.load_pgn(pgn)
      let moves = game.history()
      game.reset()
      this.index = -1
      this.playGame(moves, game)
    },
    async playGame(moves, game) {
      this.index = -1;
      for (let move of moves) {
        this.makeMove(move, game);
        await this.timeout(400);
      }
    },
    makeMove(move, game) {
      this.index++;
      game.move(move);
      board.position(game.fen());
      this.chessHistory.push(game.fen());
      this.$emit("history", game.pgn());
    },
  },
  watch: {
    gamePgn: {
      immediate: true,
      handler(cur, old) {
        if (cur != '' && cur != old) {
          this.setupGame(cur)
        }
      },
    },
  }
};
</script>

<style>
#engine-board {
  width: 500px;
}

.highlighted[class*="white"] {
  background: rgb(255, 118, 118);
}

.highlighted[class*="black"] {
  background: rgb(255, 70, 70);
}

.buttons {
  margin-top: 15px;
}

button {
  margin: 7px;
  padding: 7px;
  font-size: 14px;
  border-radius: 5px;
  outline: none;
  border: transparent 2px solid;
  background: rgb(255, 226, 214);
}

button:hover {
  border: lightskyblue 2px solid;
}

button:active {
  border: lightcoral 2px solid;
}
</style>