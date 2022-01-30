<template>
  <div>
    <h3 v-if="whitePlayerName">{{ whitePlayerName }}</h3>
    <div
      id="training-board"
      @click.exact="highlightSquare"
      @click.ctrl.prevent.exact="removeHighlight"
    ></div>
    <h3 v-if="whitePlayerName">{{ blackPlayerName }}</h3>
    <div class="buttons">
      <button title="Unmake the last move that was done on the board." v-if=!buttonDisabled @click="movePop">Move back</button>
      <button title="Make the next move in history on the board." v-if=!buttonDisabled @click="moveFor">Move forward</button>
      <button title="Remove Highlighting from the board." @click="removeHighlight">Remove Highlighting</button>
    </div>
  </div>
</template>

<script>
import ChessBoard from "chessboardjs-vue";
import Chess from "chess.js";

let board;
export default {
  name: "TrainingBoard",
  components: {},
  mounted() {
    board = ChessBoard("training-board", {
      draggable: false,
    });
    board.start()
  },
  props: {
    gamePgn: String
  },
  methods: {
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
      this.getPlayerNames(pgn)
      this.buttonDisabled = true
      this.chessHistory = []
      this.removeHighlight()
      board.start()
      let game = Chess();
      game.load_pgn(pgn);
      let moves = game.history()
      game.reset()
      this.index = -1
      this.playGame(moves, game)
    },
    async playGame(moves, game) {
      this.index = -1;
      await this.timeout(1000);
      for (let move of moves) {
        this.makeMove(move, game);
        await this.timeout(400);
      }
      this.buttonDisabled = false
    },
    makeMove(move, game) {
      this.index++;
      game.move(move);
      board.position(game.fen());
      this.chessHistory.push(game.fen());
      this.$emit("history", game.pgn());
    },
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
    getPlayerNames(pgn) {
      // console.log(pgn)
      this.whitePlayerName = /White "(.*)"/gmi.exec(pgn)[1]
      this.blackPlayerName = /Black "(.*)"/gmi.exec(pgn)[1]
    }
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
    buttonDisabled: {
      immediate: true,
      handler(cur, old) {
        this.$emit("disableStart", cur)
      }
    }
  },
  data() {
    return {
      pgn: "",
      buttonDisabled: false,
      whitePlayerName: "",
      blackPlayerName: "",
      pgnArray: Array,
      chessHistory: Array,
      index: Number,
    };
  },
};
</script>

<style scoped>
#training-board {
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

h3 {
  margin: 4px 0;
}
</style>