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
      <div class="col-lg-12">
        <h3>Search results:</h3>
      </div>
      <div v-for="book in currentBooks" :key="book.id" class="col-lg-4 mb-3">
        <div class="card h-100">
          <img
            :src="book.image"
            class="card-img-top"
            alt="Book Cover"
            style="max-height: 200px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.subtitle }}</p>
            <p class="card-text">Authors: {{ book.authors }}</p>
            <router-link
              :to="{ name: 'book-details', params: { id: book.id || '' } }"
              class="btn btn-primary"
            >
              Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation" v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            @click="changePage(currentPage - 1)"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in displayedPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            @click="changePage(currentPage + 1)"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      textInput: "",
    };
  },
  computed: {
    myBooks() {
      return this.$store.state.myBooks;
    },
    itemsPerPage() {
      return this.$store.state.itemsPerPage;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    totalPages() {
      return Math.ceil(this.myBooks.length / this.itemsPerPage);
    },
    displayedPages() {
      const maxDisplayedPages = 5;
      const startPage = Math.max(
        this.currentPage - Math.floor(maxDisplayedPages / 2),
        1
      );
      const endPage = Math.min(
        startPage + maxDisplayedPages - 1,
        this.totalPages
      );
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },
    currentBooks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.myBooks.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$store.commit("SET_CURRENT_PAGE", page);
      }
    },
  },
  watch: {
    textInput(newText) {
      if (newText !== "") {
        this.$store.dispatch("fetchDataFromAPI", newText);
      }
    },
  },
  components:  {  },
};
</script>
