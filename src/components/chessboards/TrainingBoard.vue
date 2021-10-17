<template>
  <div>
    <div id="training-board" @click="highlightSquare"></div>
    <div class="buttons">
      <button @click="removeHighlight">Remove Highlighting</button>
    </div>
  </div>
</template>

<script>
import ChessBoard from "chessboardjs-vue";

var board;
export default {
  name: "DuelBoard",
  components: {},
  mounted() {
    board = ChessBoard("training-board", {
      draggable: true,
      //   position: "start"
    });
    board.position(
      "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3"
    );
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
  },
  data() {
    return {
      hist: "", //pgn
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