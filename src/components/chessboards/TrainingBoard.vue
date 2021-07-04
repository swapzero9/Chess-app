<template>
  <div>
    <div id="training-board" @click="highlightSquare"></div>
    <button @click="removeHighlight">Remove Highlighting</button>
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
      if (e.target.classList[0] == "square-55d63") {
        if (e.target.style.background == "yellow")
          e.target.style.background = "";
        else {
          e.target.style.background = "yellow";
        }
      } else if (e.path[1].classList[0] == "square-55d63") {
        if (e.path[1].style.background == "yellow")
          e.path[1].style.background = "";
        else {
          e.path[1].style.background = "yellow";
        }
      }
    },
    removeHighlight() {
      let dd = document.getElementsByClassName("square-55d63");
      for (let d of dd) {
        d.style.background = "";
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
</style>