<template>
  <div>
    <Header title="Gry Treningowe" description="Wybierz sesje treningową, zawierającą gry silnika sztucznej inteligencji, lub jedną z sesji walidacyjnych rozegranych przez każdy z silników." />
    <div class="select-nodes">
      <h4>Wybierz sesję treningową lub walidacyjną</h4>
      <CustomSelect
        :options="trainingNodeOptions"
        @selectedOption="updateTrainingNode"
        Name="TrainingNode"
        placeholder="Wybierz sesję"
      />
      <div v-if="showGameNumber">
        <div class="game-number-box" v-if="totalGames != 0">
          <h4>Wybierz numer gry (łącznie w sesji rozegrano: {{ totalGames }})</h4>
          <input type="number" min="1" :max="totalGames" v-model="selectedGameNumber"/>
        </div>
        <h4 v-else>Brak gier w sesji</h4>
      </div>
    </div>
    <button @click="getGame" :disabled="disableStartButton">Rozpocznij grę!</button>
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
      fetch(`${process.env.VUE_APP_APIURL}/training/get_game`, {
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
      fetch(`${process.env.VUE_APP_APIURL}/training/training_nodes`, {
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

.select-nodes {
  margin-top: 25px;
}

.select-nodes h4 {
  margin: 0;
  margin-bottom: 6px;
}

input {
  outline: none;
  margin-bottom: 10px;
  padding: 2px 6px;
  border: 0;
  border-radius: 5px;
  min-width: 80px;
  box-shadow: 0 0 0.6em 0 rgba(0, 0, 0, 0.2);
  font-size: 15px;
}

button {
  margin-bottom: 15px;
}

.game-number-box {
  margin-top: 10px;
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
</style>