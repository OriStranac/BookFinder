<template>
  <div class="container">
    <h2 class="text-center">My Favorite Books</h2>
    <div class="row mt-3">
      <div v-for="book in favoriteBooks" :key="book.id" class="col-lg-4 mb-3">
        <div class="card">
          <img
            :src="book.image"
            class="card-img-top"
            alt="Book Cover"
            style="height: 200px; object-fit: contain; width: 100%; padding: 10px;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.subtitle }}</p>
            <p class="card-text">Authors: {{ book.authors }}</p>
            <div class="ml-10">
              <router-link
                v-if="book.id"
                :to="{ name: 'book-details', params: { id: book.id } }"
                class="btn btn-primary margin-left"
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
.margin-left{
    margin-right: 10px;
}</style>
