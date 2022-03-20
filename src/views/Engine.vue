<template>
  <div>
    <Header title="Sparing silników" description="Wybierz dwa silniki, które mają rozegrać partię między sobą. Gry mogą zająć do kilku minut w zależności od wybranego silnika."/>
    <div class="select-engines">
      <h5>Wybierz gracza białego</h5>
      <h5>Wybierz gracza czarnego</h5>
      <CustomSelect
        :options="engine_options"
        @selectedOption="updatePlayerWhite"
        Name="PlayerWhite"
        placeholder="Białe bierki"
      />
      <CustomSelect
        :options="engine_options"
        @selectedOption="updatePlayerBlack"
        Name="PlayerBlack"
        placeholder="Czarne Bierki"
      />
      <div class="buttons">
        <button @click="startGame">Rozpocznij grę!</button>
        <button v-if="!showLoader" @click="copyPGN">Skopiuj PGN gry</button>
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
      engine_options: window.engineOptions,
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
        alert("Nie wybrano żadnego silnika!")
        return
      }
      this.showLoader = true
      this.pgn = ""
      fetch(`${process.env.VUE_APP_APIURL}/engine/sparing`, {
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

.select-engines {
  display: grid;
  width: 600px;
  column-gap: 20px;
  grid-template-columns: 1fr 1fr;
  margin-top: 30px;
  margin-bottom: 15px;
}

@media screen and (max-width: 850px) {
  .select-engines {
    grid-template-columns: 1fr;
    gap: 15px
  }

  .select-engines > h5 {
    display: none;
  }
}

.select-engines > h5 {
  margin: 0;
  padding-bottom: 5px;
}
</style>