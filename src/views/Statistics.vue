<template>
  <div>
    <Header title="Game statistics" />
    <h4>Duel Stats</h4>
    <div class="chart-grid" v-if="duelData">
      <div v-for="d in duelData" v-bind:key="d.canvasId">
        <bar-chart :canvasId="d.canvasId" :chartData="d"></bar-chart>
      </div>
    </div>
    <h4>Training Stats</h4>
    <div class="chart-grid" v-if="trainingData">
      <div v-for="d in trainingData" v-bind:key="d.canvasId">
        <bar-chart :canvasId="d.canvasId" :chartData="d"></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import BarChart from "../components/BarChart.vue";

export default {
  name: "Statistics",
  components: {
    Header,
    BarChart,
  },
  data() {
    return {
      duelData: Array,
      trainingData: Array,
      validationData: Array,
      colors: ["#C8D5B9", "#808FC0A9", "#8068B0AB"],
    };
  },
  mounted() {
    this.duelData = [];
    this.trainingData = [];
    fetch(`${process.env.VUE_APP_APIURL}/statistics/stat_data`, {
      method: "GET",
    })
      .then((j) => {
        return j.json();
      })
      .then((data) => {
        // duel data
        let tempDuelData = [];
        for (let [key, value] of Object.entries(data.duel_statistics)) {
          tempDuelData.push({
            canvasId: `${key}`,
            title: `Games by ${key} against People`,
            labels: ["Wins", "Losses", "Draws"],
            colors: this.colors,
            records: [
              {
                label: `Duel Games, Total: ${value.reduce((p, c) => {
                  return p + c
                })}`,
                d: value,
              },
            ],
          });
        }
        this.duelData = tempDuelData;
        // training data
        let tempTrainingData = [];
        for (let [key, value] of Object.entries(data.training_statistics)) {
          let id = key.toLowerCase().replaceAll(" ", "").replaceAll(".", "")
          tempTrainingData.push({
            canvasId: `${id}`,
            title: `Games in ${key}`,
            labels: ["Wins by White", "Wins by Black", "Draws"],
            colors: this.colors,
            records: [
              {
                label: `Training Games, Total: ${value.reduce((p, c) => {
                  return p + c
                })}`,
                d: value,
              },
            ],
          });
        }
        this.trainingData = tempTrainingData;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
.chart-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 10px;
}

h4 {
margin: 10px 0;
}
</style>