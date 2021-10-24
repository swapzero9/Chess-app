<template>
  <div>
    <div id="puzzles-board" @click="highlightSquare"></div>
    <div class="buttons">
      <button @click="start">Start position</button>
      <button @click="clear">Clear board</button>
    </div>
  </div>
</template>

<script>
import ChessBoard from "chessboardjs-vue";
import Chess from "chess.js";

let game;
let board;
export default {
  name: "PuzzlesBoard",
  methods: {},
  mounted() {
    game = new Chess();

    board = ChessBoard("puzzles-board", {
      draggable: true,
      position: "start",
      dropOffBoard: "trash",
      sparePieces: true,
    });
  },
  methods: {
    start() {
      board.position(game.fen());
    },
    clear() {
      board.clear();
    },
  },
  highlightSquare(e) {
    console.log(e)
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
};
</script>

<style scoped>
#puzzles-board {
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