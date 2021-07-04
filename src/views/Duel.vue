<template>
  <div>
    <Header title="Duel" />
    <div class="split">
      <DuelBoard @history="updateHistory" />
      <GameHistory :history="{ hist }" />
    </div>
  </div>
</template>

<script>
import DuelBoard from "../components/chessboards/DuelBoard.vue";
import Header from "../components/Header.vue";
import GameHistory from "../components/GameHistory.vue";

export default {
  name: "Duel",
  components: {
    DuelBoard,
    Header,
    GameHistory,
  },
  data() {
    return {
      hist: "",
    };
  },
  methods: {
    updateHistory(data) {
      //   console.log(data)
      this.hist = data;
    },
  },
};
</script>

<style>
.split {
  display: flex;
}
</style>