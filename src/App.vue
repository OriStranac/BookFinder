<template>
  <div>
    <Header></Header>
    <Home></Home>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Header from "./components/Header.vue"
export default {
  name: "App",
  components: {
    Home,
    Header,
  },
};
</script>

<style scoped></style>
