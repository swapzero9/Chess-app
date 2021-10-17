<template>
  <div id="main">
    <h3>History</h3>
    <div id="lel">
      <div class="move" v-for="move of formattedHistory" v-bind:key="move[0]">
        <div class="move-number">
          <p>{{ move[0] }}</p>
        </div>
        <div class="move-white">
          <p>{{ move[1] }}</p>
        </div>
        <div class="move-black">
          <p>{{ move[2] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameHistory",
  props: {
    history: Object,
  },
  data() {
    return {
      formattedHistory: Array,
    };
  },
  created() {
    this.formattedHistory = [];
  },
  watch: {
    history: {
      immediate: true,
      handler(cur, old) {
        if (cur.hist !== "") {
          this.formattedHistory = [];
          let pgnArr = cur.hist.split(" ");
          for (let i = 0; i < pgnArr.length; i += 3) {
            this.formattedHistory.push([
              pgnArr[i],
              pgnArr[i + 1],
              pgnArr[i + 2],
            ]);
          }
        } else {
          this.formattedHistory = [];
        }
      },
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
  padding-bottom: 0.5em;
}

#main {
  margin: 0 1em;
}

#lel {
  background: white;
  border: 1px solid gray;
  width: 300px;
  height: 400px;
  overflow: auto;
}

#lel::-webkit-scrollbar {
  width: 0.3rem;
}

#lel::-webkit-scrollbar-thumb {
  background: var(--scrollbar-color);
}

#lel::-webkit-scrollbar-track {
  background: var(--nav-bg);
}

.move {
  display: flex;
}

p {
  margin: 0;
}

.move > div > p {
  text-align: center;
  border: dotted 1px gray;
}

.move-number {
  background: lightgray;
  flex-basis: 20%;
}
.move-white {
  flex-basis: 40%;
}
.move-black {
  flex-basis: 40%;
}
</style>