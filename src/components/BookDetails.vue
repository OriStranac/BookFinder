<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div v-if="book !== null && !loading" class="d-flex flex-wrap">
          <div class="col-lg-6">
            <img
              :src="book.image"
              class="card-img-top"
              alt="Book Cover"
              style="
                max-height: 500px;
                object-fit: contain;
                padding: 10px;
                width: 100%;
              "
            />
          </div>
          <div class="col-lg-6">
            <div
              class="card"
              style="overflow-wrap: break-word; height: auto; margin-top: 20px"
            >
              <div class="card-body">
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text">{{ book.subtitle }}</p>
                <p class="card-text">{{ book.authors }}</p>
                <p class="card-text">{{ book.description }}</p>
                <p class="card-text">Publisher: {{ book.publisher }}</p>
                <p class="card-text">Number of pages: {{ book.pages }}</p>
                <p class="card-text">Year: {{ book.year }}</p>
                <button
                  @click="addToFavorites"
                  class="btn btn-primary"
                  :disabled="isBookInFavorites()"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center">
          <p v-if="!loading">This book has no details.</p>
          <p v-if="loading">Učitavanje...</p>
        </div>
      </div>
    </div>
    <div
      v-if="addToFavoritesStatus === 'success'"
      class="alert alert-success"
      role="alert"
    >
      Book successfully added to favorites!
    </div>
    <div
      v-if="addToFavoritesStatus === 'error'"
      class="alert alert-danger"
      role="alert"
    >
      Error adding book to favorites. Please try again.
    </div>
  </div>
</template>

<script>
export default {
  name: "BookDetails",
  data() {
    return {
      book: null,
      loading: true,
      addToFavoritesStatus: null,
    };
  },
  async created() {
    console.log("created hook - BookDetails component");
    this.fetchBookDetails();
  },
  computed: {
    favoriteBooks() {
      return this.$store.getters.getFavoriteBooks;
    },
  },
  methods: {
    async fetchBookDetails() {
      try {
        console.log("Pokušavam dohvatiti detalje knjige...");
        const bookId = this.$route.params.id;
        console.log("Book ID:", bookId);

        const apiUrl = `https://www.dbooks.org/api/book/${bookId}`;
        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Podaci dobijeni sa API-ja:", data);

        this.book = data || {};
        this.loading = false;
      } catch (error) {
        console.error("Greška pri dohvatanju detalja knjige sa API-ja:", error);
        this.loading = false;
      }
    },
    addToFavorites() {
      this.$store
        .dispatch("addToFavoritesAction", this.book)
        .then(() => {
          this.addToFavoritesStatus = "success";
          setTimeout(() => {
            this.addToFavoritesStatus = null;
          }, 1000);
        })
        .catch(() => {
          this.addToFavoritesStatus = "error";
        });
    },
    isBookInFavorites() {
      const favorites = this.favoriteBooks;
      return favorites.some((favorite) => favorite.id === this.book.id);
    },
  },
};
</script>

<style scoped>
.col-lg-6 {
  margin-top: 42px;
  margin-bottom: 4px;
}
.alert {
  position: absolute;
  top: 52px;
  right: 0;
}

@media (max-width: 768px) {
  .col-lg-6 {
    margin-top: 20px;
    margin-bottom: 0;
  }
  .row {
    margin-bottom: 50px;
  }
  .pag {
    margin-bottom: 60px;
  }
  .container {
    height: calc(100vh - (headerHeight + footerHeight));
    overflow-y: auto;
  }
}
</style>
