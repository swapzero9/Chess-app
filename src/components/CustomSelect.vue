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
      <option v-if="finalValue != ''">{{ finalText }}</option>
      <option v-else-if="finalValue == '' && placeholder">
        {{ placeholder }}
      </option>
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
      finalText: "",
    };
  },
  methods: {
    updateValue(t) {
      this.finalValue = t.target.value;
      this.finalText = this.options[t.target.selectedIndex - 1].text;
      this.$emit("selectedOption", this.finalValue);
    },
  },
};
</script>

<style scoped>
select {
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  height: 2em;
  padding: 0 4em 0 1em;
  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 0.6em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  color: black;
  /* <option> colors */
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
      no-repeat right 0.8em center / 1.4em,
    linear-gradient(
      to left,
      rgba(255, 255, 255, 0.2) 3em,
      rgba(255, 255, 255, 0.8) 3em
    );
}
option {
  color: inherit;
  background-color: rgb(126, 198, 226, 0.2);
}
</style>