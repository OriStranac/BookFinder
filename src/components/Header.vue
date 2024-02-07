<template>
  <nav class="navbar navbar-expand-lg" style="height: 52px;">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <router-link to="/" class="navbar-brand ps-0 font-weight-bold">BookFinder</router-link>
      <div class="d-flex">
        <router-link to="/" class="nav-link me-3">Home</router-link>
        <router-link to="/favorites" class="nav-link">Favorites</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>

</style>