<template>
  <div>
    <canvas :id="canvasId" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "BarChart",
  data: () => {
    return {
      canDraw: false,
      hasData: false,
    };
  },
  props: {
    canvasId: String,
    chartData: Object,
    start: Number,
  },
  methods: {
    createChart() {
      const el = document.getElementById(this.canvasId);
      const ctx = el.getContext("2d");
      let d = [];
      let i = this.start;
      for (let el of this.chartData.records) {
        d.push({
          label: el.label,
          data: el.d,
          borderWidth: 1,
          backgroundColor: this.chartData.colors[i],
        });
        i++;
      }
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.chartData.labels,
          datasets: d,
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: this.chartData.title,
            },
            scales: {
              y: {
                ticks: {
                  display: false,
                  precision: 0,
                  callback: (value) => {
                    console.log(value)
                    if (value % 1 == 0) {
                      return value
                    }
                  }
                }
              }
            }
          },
        },
      });
    },
  },
  mounted() {
    this.canDraw = true;
  },
  watch: {
    chartData: {
      immediate: true,
      handler(cur, old) {
        if (cur) {
          this.hasData = true;
        }
      },
    },
    canDraw: {
      immediate: true,
      handler(cur, old) {
        if (cur && this.hasData) {
          this.createChart();
        }
      },
    },
    hasData: {
      immediate: true,
      handler(cur, old) {
        if (cur && this.canDraw) {
          this.createChart();
        }
      },
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 400px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.925);
  border-radius: 20px;
  padding: 8px 16px;
}
</style>