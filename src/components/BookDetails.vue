<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div v-if="book !== null && !loading" class="text-center">
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
              <p class="card-text">{{ book.authors }}</p>
              <p class="card-text">{{ book.description }}</p>
              <p class="card-text">Publisher: {{ book.publisher }}</p>
              <p class="card-text">Number of pages: {{ book.pages }}</p>
              <p class="card-text">Year: {{ book.year }}</p>
              <button @click="addToFavorites" class="btn btn-primary">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          <p v-if="!loading">Knjiga nije pronađena.</p>
          <p v-if="loading">Učitavanje...</p>
        </div>
      </div>
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
    };
  },
  async created() {
    console.log("created hook - BookDetails component");
    await this.fetchBookDetails();
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
      this.$store.dispatch("addToFavoritesAction", this.book);
    },
  },
};
</script>

<style scoped></style>
