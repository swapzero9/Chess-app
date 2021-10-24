<template>
  <div>
    <Header title="Training" />
    <div class="select-nodes">
      <CustomSelect
        :options="trainingNodeOptions"
        @selectedOption="updateTrainingNode"
        Name="TrainingNode"
        placeholder="Pick me!"
      />
    </div>
    <button @click="nextGame">Next Game</button>
    <div class="split">
      <TrainingBoard @history="updateHistory" :gamePgn="pgn" />
      <GameHistory :history="{ hist }" />
    </div>
  </div>
</template>

<script>
import TrainingBoard from "../components/chessboards/TrainingBoard.vue";
import Header from "../components/Header.vue";
import GameHistory from "../components/GameHistory.vue";
import CustomSelect from "../components/CustomSelect.vue";

export default {
  name: "Training",
  components: {
    TrainingBoard,
    Header,
    GameHistory,
    CustomSelect,
  },
  data() {
    return {
      hist: "",
      pgn: "",
      trainingNode: "",
      trainingNodeOptions: Array,
    };
  },
  methods: {
    updateHistory(data) {
      this.hist = data;
    },
    nextGame() {
      this.pgn = "";
      fetch("http://localhost:8000/training/last_training_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          node_name: this.trainingNode,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            return;
          }
          this.pgn = data.pgn;
        });
    },
    fetchNodes() {
      fetch("http://localhost:8000/training/training_nodes", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            return;
          } else if (!data.node_list) {
            console.log("empty");
            return;
          }
          let temp = [];
          for (let i = 0; i < data.node_list.length; i++) {
            temp.push({
              key: i + 1,
              value: data.node_list[i],
              text: data.node_list[i],
            });
          }
          this.trainingNodeOptions = temp;
        });
    },
    updateTrainingNode(data) {
      this.trainingNode = data;
    },
  },
  created() {
    // fetch distinct training nodes
    this.trainingNodeOptions = []
    this.fetchNodes();
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