<template>
  <div>
    <Header title="Duel" />
    <CustomSelect :options="op" @selectedOption="updateEngine" Name="Engine" placeholder="Select an engine to play with"></CustomSelect>
    <div class="split">
      <DuelBoard @history="updateHistory" :selectedengine="{ engine }" />
      <GameHistory :history="{ hist }" />
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
      op: [
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
      console.log(data);
      this.engine = data;
    },
  },
};
</script>

<style>
.split {
  display: flex;
}
</style>