<template>
  <div class="container mt-3">
    <h2 class="text-center">My Favorite Books</h2>
    <div class="row mt-3">
      <div v-for="book in favoriteBooks" :key="book.id" class="col-lg-4 mb-3">
        <div class="card">
          <img
            :src="book.image"
            class="card-img-top"
            alt="Book Cover"
            style="height: 200px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.subtitle }}</p>
            <p class="card-text">Authors: {{ book.authors }}</p>
            <router-link
              v-if="book.id"
              :to="{ name: 'book-details', params: { id: book.id } }"
              class="btn btn-primary"
            >
              Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavouritesBooks",
  computed: {
    favoriteBooks() {
      return this.$store.getters.getFavoriteBooks;
    },
  },
};
</script>
<style scoped>

</style>