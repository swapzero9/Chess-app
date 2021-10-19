<template>
  <select @change="updateValue" :name="Name" :title="Name">
    <option v-if="placeholder" disabled selected value="">{{ placeholder }}</option>
    <option
      v-for="option in options"
      v-bind:value="option.value"
      v-bind:key="option.key"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    options: Array,
    Name: String,
    placeholder: String,
  },
  data() {
    return {
      finalValue: "",
    };
  },
  methods: {
    updateValue(t) {
      this.finalValue = t.target.value;
      this.$emit("selectedOption", this.finalValue);
    },
  },
};
</script>

<style scoped>
select {
  outline: none;
  margin-bottom: 10px;
  padding: 4px;
  border-radius: 5px;
  min-width: 200px;
  font-size: 15px;
}
</style>