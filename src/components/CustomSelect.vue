<template>
  <div>
    <select
      v-if="!disableSelect"
      @change="updateValue"
      :name="Name"
      :title="Name"
    >
      <option v-if="placeholder" disabled selected value="">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        v-bind:value="option.value"
        v-bind:key="option.key"
      >
        {{ option.text }}
      </option>
    </select>
    <select v-else :name="Name" :title="Name" disabled>
      <option v-if="finalValue != ''">{{finalText}}</option>
      <option v-else-if="finalValue == '' && placeholder">{{placeholder}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    options: Array,
    Name: String,
    placeholder: String,
    disableSelect: Boolean,
  },
  data() {
    return {
      finalValue: "",
      finalText: ""
    };
  },
  methods: {
    updateValue(t) {
      this.finalValue = t.target.value;
      this.finalText = this.options[t.target.selectedIndex-1].text
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