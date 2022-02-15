<template>
  <div>
    <Header title="Pojedynek" description="Wybierz silnik, z którym chcesz rozegrać partię i spróbuj go pokonać." />
    <div class="split-horizontal">
      <CustomSelect
        :options="engine_options"
        @selectedOption="updateEngine"
        Name="Engine"
        placeholder="Wybierz silnik szachowy"
        :disableSelect="disableEngineSelect"
      ></CustomSelect>
      <h4>Wybierz promocję pionka</h4>
      <CustomSelect
        :options="promotion_options"
        @selectedOption="updatePromotion"
        Name="Promotions"
      ></CustomSelect>
    </div>
    <div class="split">
      <DuelBoard
        @history="updateHistory"
        @finalPgn="saveGame"
        :selectedengine="{ engine }"
        :prom="{ promotion }"
      />
      <GameHistory :history="{ hist }" :keepScore="false" />
    </div>
  </div>
</template>

<script>
import DuelBoard from "../components/chessboards/DuelBoard.vue";
import Header from "../components/Header.vue";
import GameHistory from "../components/GameHistory.vue";
import CustomSelect from "../components/CustomSelect.vue";

export default {
  name: "Duel",
  components: {
    DuelBoard,
    Header,
    GameHistory,
    CustomSelect,
  },
  data() {
    return {
      hist: "",
      engine: "",
      promotion: "q",
      disableEngineSelect: false,
      promotion_options: [
        {
          key: 1,
          value: "q",
          text: "Królowa",
        },
        {
          key: 2,
          value: "r",
          text: "Wieża",
        },
        {
          key: 3,
          value: "n",
          text: "Skoczek",
        },
        {
          key: 4,
          value: "b",
          text: "Goniec",
        },
      ],
      engine_options: window.engineOptions
    };
  },
  methods: {
    updateHistory(data) {
      //   console.log(data)
      if (data) {
        this.disableEngineSelect = true
      } else {
        this.disableEngineSelect = false
      }
      this.hist = data;
    },
    updateEngine(data) {
      this.engine = data;
    },
    updatePromotion(data) {
      this.promotion = data;
    },
    saveGame(data) {
      this.disableEngineSelect = false
      let json = {
        opponent: this.engine,
        pgn: data,
      }

      fetch(`${process.env.VUE_APP_APIURL}/duel/save_game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json)
      })
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        // console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
    },
  },
};
</script>

<style scoped>
.split {
  display: flex;
}
.split-horizontal {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 350px;
  margin-top: 30px;
  margin-bottom: 15px;
}

.split-horizontal > * {
  flex-grow: 1;
}

.split-horizontal > h4 {
  margin: 0;
}
</style>