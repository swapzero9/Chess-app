<template>
  <div>
    <div id="duel-board"></div>
    <button v-on:click="resetBoard">New Game</button>
    <button v-on:click="copyPgn">CopyPgn</button>
  </div>
</template>

<script>
import ChessBoard from "chessboardjs-vue";
import Chess from "chess.js";

var game;
var board;
export default {
  name: "DuelBoard",
  components: {},
  mounted() {
    game = Chess();
    board = ChessBoard("duel-board", {
      draggable: true,
      position: "start",
      onDragStart: (source, piece, position, orientation) => {
        if (game.game_over()) return false;
        if (piece.search(/^b/) !== -1) return false;
      },
      onDrop: (source, target) => {
        // check if promotion
        let move = game.move({
          from: source,
          to: target,
          promotion: "q",
        });

        if (move === null) {
          return "snapback";
        }

        if (game.in_checkmate()) {
          console.log("checkmate");
          return false;
        }
        if (game.insufficient_material()) {
          console.log("insufficietn");
          return false;
        }
        if (game.in_threefold_repetition()) {
          console.log("three");
          return false;
        }
        if (game.in_stalemate()) {
          console.log("stalemate");
          return false;
        }
        if (game.in_draw()) {
          console.log("draw");
          return false;
        }

        //call api to make random move
        fetch("http://localhost:8000/duel/position", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fen: game.fen(),
            moveFrom: source,
            moveTo: target,
            targetComputer: "minimax_engine",
          }),
        })
          .then((res) => {
            res
              .json()
              .then((data) => {
                game.move({
                  from: data.moveFrom,
                  to: data.moveTo,
                  promotion: data.promotion,
                });
                board.position(game.fen());
                if (game.game_over()) {
                  if (game.in_checkmate()) {
                    console.log("checkmate");
                    return false;
                  }
                  if (game.insufficient_material()) {
                    console.log("insufficietn");
                    return false;
                  }
                  if (game.in_threefold_repetition()) {
                    console.log("three");
                    return false;
                  }
                  if (game.in_stalemate()) {
                    console.log("stalemate");
                    return false;
                  }
                  if (game.in_draw()) {
                    console.log("draw");
                    return false;
                  }
                }
                this.$emit("history", game.pgn());
              })
              .catch((err) => {
                // error parsing json
                console.error("ups", err);
              });
          })
          .catch((err) => {
            // error receiving data from api
            console.error("api, failure", err);
          });
      },
      onSnapEnd: () => {
        board.position(game.fen());
        this.$emit("history", game.pgn());
      },
    });
  },
  methods: {
    resetBoard(e) {
      board.start(false);
      game = Chess();
      this.$emit("history", game.pgn());
    },
    copyPgn(e) {
      console.log(game.pgn());
    },
  },
  data() {
    return {
      promotion: true,
      promoted: "",
    };
  },
};
</script>

<style>
#duel-board {
  width: 500px;
}
</style>