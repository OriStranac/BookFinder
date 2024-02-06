<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" style="height: 52px;">
    <div class="container-fluid d-flex justify-content-between">
      <router-link to="/" class="navbar-brand ps-0 font-weight-bold">BookFinder</router-link>
      <div class="d-flex">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favorites" class="nav-link">Favorites</router-link>
          </li>
        </ul>
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
