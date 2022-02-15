<template>
  <div>
    <h1>{{ title }}<span v-bind:title="description" v-if="description != undefined">[?]</span></h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    description: String
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
</style>