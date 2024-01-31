<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <div class="container-fluid d-flex justify-content-between">
      <a class="navbar-brand ps-0 font-weight-bold" href="#">BookFounder</a>
      <div class="d-flex">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Favorites</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar-brand {
  padding-left: 0 !important;
}
</style>

<script>
export default {
  name: "Header",
};
</script>
