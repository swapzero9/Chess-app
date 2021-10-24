<template>
  <div>
    <Header title="Duel" />
    <div class="split-horizontal">
      <CustomSelect
        :options="engine_options"
        @selectedOption="updateEngine"
        Name="Engine"
        placeholder="Select an engine to play with"
      ></CustomSelect>
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
      promotion_options: [
        {
          key: 1,
          value: "q",
          text: "Queen",
        },
        {
          key: 2,
          value: "r",
          text: "Rook",
        },
        {
          key: 3,
          value: "n",
          text: "Knight",
        },
        {
          key: 4,
          value: "b",
          text: "Bishop",
        },
      ],
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
      //   console.log(data)
      this.hist = data;
    },
    updateEngine(data) {
      this.engine = data;
    },
    updatePromotion(data) {
      this.promotion = data;
    },
    saveGame(data) {
      let json = {
        opponent: this.engine,
        pgn: data,
      }

      fetch("http://localhost:8000/duel/save_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(json)
      })
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        console.log(data)
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
}

.split-horizontal > * {
  flex-grow: 1;
}
</style>