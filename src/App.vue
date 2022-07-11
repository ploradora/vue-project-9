<template>
  <HomePage />
</template>

<script>
import HomePage from "./HomePage.vue";
export default { components: { HomePage } };
</script>

<style lang="scss">
@import "./assets/globalStyles.scss";

#app {
  font-family: $ff;
  width: 100%;
  min-height: 100vh;
}
</style>
