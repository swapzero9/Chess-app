<template>
  <div class="board-main">
    <h3 v-if="blackPlayerName">{{ blackPlayerName }}</h3>
    <div
      id="training-board"
      @click.exact="highlightSquare"
      @click.ctrl.prevent.exact="removeHighlight"
    ></div>
    <h3 v-if="whitePlayerName">{{ whitePlayerName }}</h3>
    <div class="buttons">
      <button title="Unmake the last move that was done on the board." v-if=!buttonDisabled @click="movePop"><i class="fas fa-arrow-left"></i></button>
      <button title="Make the next move in history on the board." v-if=!buttonDisabled @click="moveFor"><i class="fas fa-arrow-right"></i></button>
      <button class="highlight-button" title="Usuń podświetlenie pól z szachownicy" @click="removeHighlight">Usuń podświetlenie</button>
      <input style="display: none" type="range" min="100" max="1000" v-model="gameSpeed">
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
    board.start();
    window.addEventListener("resize", () => {
        board.resize();
      });
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
        await this.timeout(this.gameSpeed);
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
      let wp = window.engineNamesByKeys[/White "(.*)"/gmi.exec(pgn)[1]]
      let bp = window.engineNamesByKeys[/Black "(.*)"/gmi.exec(pgn)[1]]
      let res = /Result "(.*)-(.*)"/gmi.exec(pgn)
      wp = `${wp}, ${res[1]}`
      bp = `${bp}, ${res[2]}`
      this.whitePlayerName = wp
      this.blackPlayerName = bp
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
      gameSpeed: 400,
      pgnArray: Array,
      chessHistory: Array,
      index: Number,
    };
  },
};
</script>

<style scoped>
#training-board {
  width: 600px;
}

@media screen and (max-width: 650px) {
  #training-board {
    width: 100%;
    height: auto;
  }
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
  background: var(--button-color);
  color: white;
  cursor: pointer;
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

@media only screen and (max-width: 650px) {
  .highlight-button {
    display: none;
  }
}
</style>