<template>
  <div>
    <h1>
      {{ title }}<span v-bind:title="description" v-if="description != undefined"
        >[?]</span
      >
    </h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    description: String,
  },
};
</script>

<style scoped>
h1 > span {
  font-size: 15px;
  vertical-align: top;
  margin-left: 5px;
}
h1 {
  color: white;
}

@media screen and (max-width: 700px) {
  span {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  div {
    height: 90px;
    margin-block: 0.67em;
    position: relative;
  }
  h1 {
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>