<template>
  <div>
    <div
      id="duel-board"
      @click="highlightSquare"
    ></div>
    <div class="buttons">
      <button v-on:click="resetBoard">New Game</button>
      <button v-on:click="copyPgn">Copy PGN</button>
      <button v-on:click="removeHighlight">Remove Highlighting</button>
    </div>
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
    this.$nextTick(() => {
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
            promotion: this.promotion,
          });

          if (move === null) {
            if (source == target) {
              // color source
              let a = document.querySelector(
                `.square-55d63[data-square=${source}]`
              );
              if (a.classList.contains("highlighted")) {
                a.classList.remove("highlighted");
              } else {
                a.classList.add("highlighted");
              }
            }
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

          //call api to make move
          this.makeMove(source, target);
        },
        onSnapEnd: () => {
          board.position(game.fen());
          this.removeHighlight();
          this.$emit("history", game.pgn());
          this.pgn = game.pgn()
        },
      });
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
      navigator.clipboard
        .writeText(game.pgn())
        .then(() => {
          console.log("succ");
        })
        .catch(() => {
          console.error("err");
        });
    },
    makeMove(source, target) {
      console.log(this.engine);
      fetch("http://localhost:8000/duel/position", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fen: game.fen(),
          moveFrom: source,
          moveTo: target,
          targetComputer: this.engine,
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
  },
  props: {
    selectedengine: Object,
    prom: Object,
  },
  data() {
    return {
      promotion: "",
      promoted: "",
      engine: "",
      pgn: "",
    };
  },
  watch: {
    selectedengine: {
      immediate: true,
      handler(cur, old) {
        this.engine = cur.engine == "" ? "random" : cur.engine;
      },
    },
    prom: {
      immediate: true,
      handler(cur, old) {
        this.promotion = cur.promotion;
      },
    },
  },
};
</script>

<style scoped>
#duel-board {
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