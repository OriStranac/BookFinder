<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <input
          v-model="textInput"
          type="text"
          class="form-control"
          placeholder="Search for books..."
        />
      </div>
    </div>
    <div class="row mt-3">
      <div
        v-for="book in currentBooks"
        :key="book.id"
        class="col-lg-4 mb-3"
      >
        <div class="card">
          <img
            :src="book.image"
            class="card-img-top"
            alt="Book Cover"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.subtitle }}</p>
            <p class="card-text">Authors: {{ book.authors }}</p>
            <a :href="book.url" target="_blank" class="btn btn-primary">More Info</a>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation"  v-if="myBooks && myBooks.length > 0">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="changePage(currentPage - 1)" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in displayedPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="changePage(currentPage + 1)" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["itemsPerPage", "currentPage"]),
    ...mapGetters(["totalPages", "pages", "currentBooks"]),
    textInput: {
      get() {
        return this.$store.state.textInput;
      },
      set(value) {
        this.$store.commit("SET_TEXT_INPUT", value);
      },
    },
    myBooks() {
      return this.$store.state.myBooks;
    },
    displayedPages() {
      const maxDisplayedPages = 5;
      const startPage = Math.max(this.currentPage - Math.floor(maxDisplayedPages / 2), 1);
      const endPage = Math.min(startPage + maxDisplayedPages - 1, this.totalPages);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
  },
  methods: {
    ...mapActions(["fetchDataFromAPI"]),
    ...mapMutations(["SET_TEXT_INPUT"]),
    async changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$store.commit("SET_CURRENT_PAGE", page);

        // Provera da li je stranica već dohvaćena
        if (!this.$store.state.pagesData[page]) {
          // Ako nije, dohvat podataka sa API-ja
          const data = await this.fetchDataFromAPI(this.textInput);
          this.$store.commit("SET_PAGES_DATA", { page, data });
        }
      }
    },
  },
  watch: {
    textInput(newText) {
      if (newText !== "") {
        this.fetchDataFromAPI(newText);
      }
    },
  },
};
</script>