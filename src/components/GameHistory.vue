<template>
  <div class="main">
    <h3>Historia posunięć</h3>
    <div class="lel">
      <div class="move" v-for="move of formattedHistory" v-bind:key="move[0]">
        <div class="move-number">
          <p>{{ move[0] }}</p>
        </div>
        <div class="move-white" :fen-data="move[3]">
          <p>{{ move[1] }}</p>
        </div>
        <div v-if="move[2]" class="move-black" :fen-data="move[4]">
          <p>{{ move[2] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chess from "chess.js";

export default {
  name: "GameHistory",
  props: {
    history: Object,
    keepScore: Boolean,
  },
  data() {
    return {
      formattedHistory: Array,
    };
  },
  created() {
    this.formattedHistory = [];
  },
  watch: {
    history: {
      immediate: true,
      handler(cur, old) {
        if (cur.hist !== "") {
          this.formattedHistory = [];
          let pgnArr = cur.hist.split(" ");
          if (!this.keepScore) {
            for (let i = 0; i < pgnArr.length; i += 3) {
              this.formattedHistory.push([
                pgnArr[i],
                pgnArr[i + 1],
                pgnArr[i + 2],
              ]);
            }
          } else {
            let game = Chess();
            for (let i = 0; i < pgnArr.length; i += 3) {
              let pos = [];
              game.move(pgnArr[i + 1]);
              pos.push(game.fen());
              if (pgnArr[i + 2]) {
                game.move(pgnArr[i + 2]);
                pos.push(game.fen());
              }
              this.formattedHistory.push([
                pgnArr[i],
                pgnArr[i + 1],
                pgnArr[i + 2],
                pos[0],
                pos[1],
              ]);
            }
          }
        } else {
          this.formattedHistory = [];
        }
      },
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
  padding-bottom: 0.5em;
}

.main {
  margin: 0 1em;
}

.lel {
  background: white;
  border: 1px solid gray;
  width: 300px;
  height: 400px;
  overflow: auto;
}

.lel::-webkit-scrollbar {
  width: 0.3rem;
}

.lel::-webkit-scrollbar-thumb {
  background: var(--palette-5);
}

.lel::-webkit-scrollbar-track {
  background: var(--nav-bg);
}

.move {
  display: flex;
}

.move>* {
  padding-block: 1px;
}

p {
  margin: 0;
}

.move > div > p {
  text-align: center;
}

.move-number {
  flex-basis: 20%;
  background: linear-gradient(
    to right,
    var(--palette-4),
    rgba(10, 135, 85, 0.125),
    rgba(10, 135, 85, 0.125)
  );
}
.move-white {
  flex-basis: 40%;
}
.move-black {
  flex-basis: 40%;
}

.move-white,
.move-black {
  -webkit-box-shadow: inset -7px -7px 27px -5px rgb(2 97 56 / 35%);
  -moz-box-shadow: inset -7px -7px 27px -5px rgb(2 97 56 / 35%);
  box-shadow: inset -7px -7px 27px -5px rgb(2 97 56 / 35%);
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

@media screen and (max-width: 1000px) {
  .main {
    display: none;
  }
}
</style>