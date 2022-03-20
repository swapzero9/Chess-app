<template>
  <div>
    <Header title="Statystyki" />
    <h4>Statystki z gier treningowych silników AI</h4>
    <div class="chart-grid" v-if="trainingData.length > 0">
      <div v-for="d in trainingData" v-bind:key="d.canvasId">
        <bar-chart :canvasId="d.canvasId" :chartData="d" :start="1"></bar-chart>
      </div>
    </div>
    <div v-else>
      <h4 class="lack-of-games">Brak gier</h4>
    </div>

    <h4>Statystki z gier walidacyjnych silników AI</h4>
    <div class="chart-grid" v-if="validationData.length > 0">
      <div v-for="d in validationData" v-bind:key="d.canvasId">
        <bar-chart :canvasId="d.canvasId" :chartData="d" :start="2"></bar-chart>
      </div>
    </div>
    <div v-else>
      <h4 class="lack-of-games">Brak gier</h4>
    </div>

    <h4>Statystyki pojedynków</h4>
    <div class="chart-grid" v-if="duelData.length > 0">
      <div v-for="d in duelData" v-bind:key="d.canvasId">
        <bar-chart :canvasId="d.canvasId" :chartData="d" :start="0"></bar-chart>
      </div>
    </div>
    <div v-else>
      <h4 class="lack-of-games">Brak gier</h4>
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
      colors: ["#84beff", "#ff8884", "#8884FF", "#beff84", "#ffc584"],
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
            title: `Pojedynki rozegrane przez ${window.engineNamesByKeys[key]}`,
            labels: ["Wygrane", "Przegrane", "Remisy"],
            colors: this.colors,
            records: [
              {
                label: `Gry pojedynkowe, łącznie: ${value.reduce((p, c) => {
                  return p + c;
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
          let id = key.toLowerCase().replaceAll(" ", "").replaceAll(".", "");
          tempTrainingData.push({
            canvasId: `${id}`,
            title: `Gry w ${key}`,
            labels: ["Wygrane białymi", "Wygrane czarnymi", "Remisy"],
            colors: this.colors,
            records: [
              {
                label: `Gry treningowe, łącznie: ${value.reduce((p, c) => {
                  return p + c;
                })}`,
                d: value,
              },
            ],
          });
        }
        this.trainingData = tempTrainingData;
        // validation data
        let tempValidationData = [];
        for (let [key, value] of Object.entries(data.validation_statistics)) {
          let records = [];
          for (let [k, v] of Object.entries(value)) {
            records.push({
              label: `${window.engineNamesByKeys[k]}`,
              d: v,
            });
          }
          let id = key.toLowerCase().replaceAll(" ", "").replaceAll(".", "");
          tempValidationData.push({
            canvasId: `${id}`,
            title: `${key}`,
            labels: ["Wygrane białymi", "Wygrane czarnymi", "Remisy"],
            colors: this.colors,
            records: records,
          });
        }
        this.validationData = tempValidationData;
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
  margin-top: 30px;
}
.lack-of-games {
  margin-left: 10px;
  margin-top: 10px;
}

</style>