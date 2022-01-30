<template>
  <div>
    <Header title="Training" description="Select training session of an AI or one of the validation sessions that it played against other engines. Then select the game from the session and click start to see it." />
    <div class="select-nodes">
      <h4>Select training or validation session</h4>
      <CustomSelect
        :options="trainingNodeOptions"
        @selectedOption="updateTrainingNode"
        Name="TrainingNode"
        placeholder="Pick me!"
      />
      <div v-if="showGameNumber">
        <div class="game-number-box" v-if="totalGames != 0">
          <h4>Select game number (total games played: {{ totalGames }})</h4>
          <input type="number" min="1" :max="totalGames" v-model="selectedGameNumber"/>
        </div>
        <h4 v-else>No games in session</h4>
      </div>
    </div>
    <button @click="getGame" :disabled="disableStartButton">Start the Game!</button>
    <div class="split">
      <TrainingBoard @history="updateHistory" :gamePgn="pgn" @disableStart="disableStart" />
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
      totalGames: 1,
      showGameNumber: false,
      selectedGameNumber: 1,
      disableStartButton: false,
      trainingNodeOptions: Array,
      nodeQuery: Array,
    };
  },
  methods: {
    updateHistory(data) {
      this.hist = data;
    },
    disableStart(data) {
      console.log(data)
      this.disableStartButton = data
    },
    getGame() {
      this.pgn = "";
      let type = undefined
      for (let el of this.nodeQuery) {
        if (el.name == this.trainingNode) {
          type = el.type
          break;
        }
      }
      fetch("http://localhost:8000/training/get_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          node_name: this.trainingNode,
          type: type,
          game_number: this.selectedGameNumber
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
      // call api to get all the training and validation nodes
      fetch("http://localhost:8000/training/training_nodes", {
        method: "GET",
      })
      .then(j => {
        return j.json()
      })
      .then(data => {
        this.nodeQuery = data.node_list;
        let i = 1;
        for(let el of data.node_list) {
          let temp = {
            key: i,
            value: el.name,
            text: el.name,
          }
          i++
          this.trainingNodeOptions.push(temp)
        }
      })
      .catch(error => {
        console.error(error)
      })
    },
    updateTrainingNode(data) {
      this.trainingNode = data;
      for (let el of this.nodeQuery) {
        if (el.name == data) {
          this.totalGames = el.game_number
          break;
        }
      }
      // open menu for selecting game number
      this.showGameNumber = true
    },
  },
  created() {
    // fetch distinct training nodes
    this.trainingNodeOptions = [];
    this.nodeQuery = [];
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

.select-nodes h4 {
  margin: 0;
  margin-bottom: 6px;
}

input {
  outline: none;
  margin-bottom: 10px;
  padding: 2px 6px;
  border: 1px solid black;
  border-radius: 5px;
  min-width: 170px;
  font-size: 15px;
}
</style>