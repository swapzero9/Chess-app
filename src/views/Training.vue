<template>
  <div>
    <Header title="Training" />
    <div class="split">
      <TrainingBoard @history="updateHistory" />
      <GameHistory :history="{ hist }" :keepScore="true" />
    </div>
  </div>
</template>

<script>
import TrainingBoard from "../components/chessboards/TrainingBoard.vue";
import Header from "../components/Header.vue";
import GameHistory from "../components/GameHistory.vue";

export default {
  name: "Training",
  components: {
    TrainingBoard,
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

<style scoped>
#duel-board {
  width: 500px;
}

.split {
  display: flex;
}
</style>