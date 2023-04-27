<template>
  <a :title="tip">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: "hintButton",
  props: ["tip"],
};
</script>

<style>
</style>