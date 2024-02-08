<template>
  <div class="container">
    <div class="row justify-content-center mb-3">
      <div class="col-lg-6 d-flex">
        <input
          v-model="textInput"
          type="text"
          class="form-control"
          style="height: 42px; max-width: 448px"
          placeholder="Search for books..."
        />
        <label for="sortSelect" class="ms-2 "></label>
        <select v-show="currentBooks.length > 0" v-model="sortOption" id="sortSelect" class="form-select">
          <option value="" disabled selected>Sort by...</option>
          <option value="title">Title (A-Z)</option>
          <option value="authors">Authors (A-Z)</option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-12">
        <h3 class="mb-1">Search results:</h3>
      </div>
      <div v-for="book in currentBooks" :key="book.id" class="col-lg-4 col-md-4 col-sm-6 mb-3">
        <div
          class="card"
          style="height: 375px; width: 372px; overflow-wrap: break-word"
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
          <div class="card-body" style="max-height: 175px; overflow: hidden">
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
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation" class="pag" v-if="totalPages > 1">
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
            <a class="page-link" @click="changePage(page)" href="#">{{
              page
            }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
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
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      textInput: "",
      sortOption: "",
    };
  },
  computed: {
    itemsPerPage() {
      return this.$store.state.itemsPerPage;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    totalPages() {
      return this.$store.getters.totalPages;
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
      let sortedBooks = this.$store.state.filteredBooks;

      if (this.sortOption === "title") {
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortOption === "authors") {
        sortedBooks.sort((a, b) => a.authors.localeCompare(b.authors));
      }

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return sortedBooks.slice(start, end);
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
      if (newText) {
        this.$store.dispatch("fetchDataFromAPI", newText);
      } else {
        this.$store.dispatch("resetFilteredBooks");
      }
    },
  },
};
</script>

<style scoped>
.col-lg-6 {
  margin-top: 42px;
  margin-bottom: 4px;
}
.row {
  margin-left: 20px;
}

@media (max-width: 768px) {
  .col-lg-6 {
    margin-top: 20px;
  }
  .container{
    margin-left: 0px;
  }
  .row {
   margin-left: 0px;
   margin-right: 10px;
  }
  .pag {
    margin-bottom: 60px;
  }
}
</style>
