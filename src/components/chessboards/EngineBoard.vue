<template>
  <div class="board-main">
    <div
      id="engine-board"
      @click.exact="highlightSquare"
      @click.ctrl.prevent="removeHighlight"
    ></div>
    <div class="buttons">
      <button
        title="Cofnij ruch w partii."
        v-if="!buttonDisabled"
        @click="movePop"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <button
        title="Wykonaj kolejny ruch w partii"
        v-if="!buttonDisabled"
        @click="moveFor"
      >
        <i class="fas fa-arrow-right"></i>
      </button>
      <button
        class="highlight-button"
        title="Usuń podświetlenie pól na szachownicy."
        @click="removeHighlight"
      >
        Usuń podświetlenie
      </button>
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
    window.addEventListener("resize", () => {
      board.resize();
    });
  },
  data() {
    return {
      chessHistory: Array,
      index: Number,
      buttonDisabled: true,
    };
  },
  props: {
    gamePgn: String,
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
      this.removeHighlight();
      this.chessHistory = [];
      this.buttonDisabled = true;
      let game = Chess();
      game.load_pgn(pgn);
      let moves = game.history();
      game.reset();
      this.index = -1;
      this.playGame(moves, game);
    },
    async playGame(moves, game) {
      this.index = -1;
      await this.timeout(1000);
      for (let move of moves) {
        this.makeMove(move, game);
        await this.timeout(400);
      }
      this.buttonDisabled = false;
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
        if (cur != "" && cur != old) {
          this.setupGame(cur);
        }
      },
    },
  },
};
</script>

<style scoped>
#engine-board {
  width: 600px;
  touch-action: none;
}

@media only screen and (max-width: 650px) {
  .buttons {
    margin-top: 15px;
  }
  
  .highlight-button {
    display: none;
  }

  #engine-board {
    width: 100%;
    height: auto;
  }
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
</style>