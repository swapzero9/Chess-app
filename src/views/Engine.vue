<template>
  <div>
    <Header title="Engine" description="Select two engine players and let them battle against each other. Note that the game setup can take a few minutes, since the game is played on a backend server."/>
    <div class="select-engines">
      <h5>Select white player</h5>
      <h5>Select black player</h5>
      <CustomSelect
        :options="engine_options"
        @selectedOption="updatePlayerWhite"
        Name="PlayerWhite"
        placeholder="Pick me!"
      />
      <CustomSelect
        :options="engine_options"
        @selectedOption="updatePlayerBlack"
        Name="PlayerBlack"
        placeholder="Pick me!"
      />
      <div class="buttons">
        <button @click="startGame">Start the Game!</button>
        <button v-if="!showLoader" @click="copyPGN">Copy PGN</button>
        <Loader v-if="showLoader" />
      </div>
    </div>
    <div class="split">
      <EngineBoard @history="updateHistory" :gamePgn="pgn"/>
      <GameHistory :history="{ hist }" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import GameHistory from "../components/GameHistory.vue";
import EngineBoard from "../components/chessboards/EngineBoard.vue";
import CustomSelect from "../components/CustomSelect.vue";
import Loader from "../components/Loader.vue"

export default {
  name: "Training",
  components: {
    EngineBoard,
    Header,
    GameHistory,
    CustomSelect,
    Loader
  },
  data() {
    return {
      hist: "",
      pgn: "",
      playerWhite: "",
      playerBlack: "",
      showLoader: false,
      engine_options: [
        {
          key: 1,
          value: "random",
          text: "Random Engine",
        },
        {
          key: 2,
          value: "minimax",
          text: "Minimax Engine",
        },
        {
          key: 3,
          value: "stockfish",
          text: "Stockfish Engine",
        },
        {
          key: 4,
          value: "ai",
          text: "Ai Engine",
        },
      ],
    };
  },
  methods: {
    updateHistory(data) {
      this.hist = data;
    },
    updatePlayerWhite(data) {
      this.playerWhite = data;
    },
    updatePlayerBlack(data) {
      this.playerBlack = data;
    },
    copyPGN(data) {
      navigator.clipboard
        .writeText(this.pgn)
        .then(() => {
          console.log("succ");
        })
        .catch(() => {
          console.error("err");
        });
    },
    startGame() {
      if (this.playerWhite == '' || this.playerBlack == '') {
        alert("You didn't select the engine!")
        return
      }
      this.showLoader = true
      this.pgn = ""
      fetch("http://localhost:8000/engine/sparing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_white: this.playerWhite,
          player_black: this.playerBlack,
        }),
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error)
          return
        }
        this.showLoader = false
        this.pgn = data.pgn;
      })
    }
  },
};
</script>

<style scoped>
.split {
  display: flex;
}

.buttons {
  margin-top: 10px;
  display: flex;
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

.select-engines {
  display: grid;
  width: 600px;
  column-gap: 20px;
  grid-template-columns: 1fr 1fr;
}

.select-engines > h5 {
  margin: 0;
  padding-bottom: 5px;
}
</style>