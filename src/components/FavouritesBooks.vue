<template>
  <div class="container">
    <div class="row justify-content-center mb-3"></div>
    <div class="row mt-3">
      <div class="col-lg-12 text-center">
        <h3 class="mb-1">Favorite books:</h3>
      </div>
      <div
        v-for="book in favoriteBooks"
        :key="book.id"
        class="col-lg-4 col-md-6 mb-3"
      >
        <div
          class="card h-100"
          style="
            overflow-wrap: break-word;
            margin-right: 1rem;
            margin-bottom: 1rem;
          "
        >
          <img
            :src="book.image"
            class="card-img-top"
            alt="Book Cover"
            style="
              max-height: 200px;
              object-fit: contain;
              padding: 10px;
              width: 100%;
            "
          />
          <div class="card-body" style="overflow: hidden">
            <h5
              class="card-title text-truncate"
              style="font-size: 18px; width: 100%"
            >
              {{ book.title }}
            </h5>
            <p
              class="card-text text-truncate"
              style="font-size: 16px; width: 100%"
            >
              Authors: {{ book.authors }}
            </p>
            <router-link
              :to="{ name: 'book-details', params: { id: book.id || '' } }"
              class="btn btn-primary"
            >
              Details
            </router-link>
            <button
              @click="removeFromFavorites(book.id)"
              class="btn btn-danger"
            >
              Remove from Favorites
            </button>
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
  methods: {
    removeFromFavorites(bookId) {
      this.$store.dispatch("removeFromFavorites", bookId);
    },
  },
};
</script>

<style scoped>
.btn-primary {
  margin-right: 10px;
}
</style>
