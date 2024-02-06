<template>
  <div>
    <Header></Header>
    <div class="main-content bg-light">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue"

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - 52px * 2);
  padding-top: 52px; 
  padding-bottom: 52px;
  width: 100%;
}
</style>
