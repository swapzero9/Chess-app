<template>
  <div>
    <button @click="fetchPgn">Next Game</button>
    <div id="training-board" @click="highlightSquare"></div>
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

let game;
let board;
export default {
  name: "DuelBoard",
  components: {},
  mounted() {
    board = ChessBoard("training-board", {
      draggable: false,
    })
    game = Chess()
    // mechanics for loading new games
    this.fetchPgn()
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
    fetchPgn(b) {
      game.reset()
      this.$emit("history", game.pgn());
      board.position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
      this.removeHighlight()
      fetch("http://localhost:8000/training/last_training_game", {
        method: "GET"
      })
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        let pgn = data.pgn.split("\n");
        pgn = pgn[pgn.length - 1]
        this.pgn = pgn
        let temp = pgn.split(" ")
        this.pgnArray = [];
        this.chessHistory = [];
        this.chessHistory.push("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        for (let i = 0; i < temp.length; i += 3) {
          this.pgnArray.push(temp[i + 1])
          this.pgnArray.push(temp[i + 2])
        }
        this.pgnArray = this.pgnArray.filter((x) => {
          return x != undefined
        })
        // if autoplay
        this.playGame()
      })
    },
    fetchTrainingSessions() {

    },
    async playGame() {
      this.index = -1
      for (let move of this.pgnArray) {
        this.makeMove(move, board)
        await this.timeout(300)
      }
    },
    makeMove(move, board) {
      this.index++
      game.move(move)
      board.position(game.fen())
      this.chessHistory.push(game.fen())
      this.$emit("history", game.pgn());
    },
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    movePop() {
      if (this.index > 0) {
        this.index--;
        board.position(this.chessHistory[this.index])
      }
    },
    moveFor() {
      if (this.index < this.chessHistory.length) {
        this.index++;
        board.position(this.chessHistory[this.index])
      }
    }
  },
  data() {
    return {
      pgn: "",
      pgnArray: Array,
      chessHistory: Array,
      index: Number,
    };
  },
};
</script>

<style>
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
</style>