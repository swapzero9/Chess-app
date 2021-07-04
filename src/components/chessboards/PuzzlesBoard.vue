<template>
  <div>
    <div id="puzzles-board"></div>
  </div>
</template>

<script>
import ChessBoard from "chessboardjs-vue";
import Chess from "chess.js";

export default {
  name: "PuzzlesBoard",
  methods: {},
  mounted() {
    const game = new Chess();

    let board = ChessBoard("puzzles-board", {
      draggable: true,
      position: "start",
      onSnapEnd: () => {
        fetch("http://localhost:8000/puzzles/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameId: "ron",
            fen: board.fen(),
            moveFrom: "e2",
            moveTo: "e4",
          }),
        }).then((response) => {
          response.json().then((data) => {
            console.log(data);
          });
        });
      },

      onDrop: (source, target) => {
        console.log({ source, target });
      },
    });
    console.log(board.fen());
  },
};
</script>

<style>
#puzzles-board {
  width: 500px;
}
</style>