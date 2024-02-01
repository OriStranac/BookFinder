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
    <nav aria-label="Page navigation" v-if="myBooks && myBooks.length > 0">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="changePage(currentPage - 1)" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in pages" :key="page" class="page-item" :class="{ active: currentPage === page }">
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
export default {
  name: "Home",
  data() {
    return {
      textInput: "",
      myBooks: [],
      itemsPerPage: 3,
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      if (Array.isArray(this.myBooks)) {
        return Math.ceil(this.myBooks.length / this.itemsPerPage);
      } else {
        return 0;
      }
    },
    pages() {
      const pagesArray = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
    currentBooks() {
      if (Array.isArray(this.myBooks)) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.myBooks.slice(start, end);
      } else {
        return [];
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
  methods: {
    async fetchDataFromAPI(query) {
      try {
        const apiUrl = `https://www.dbooks.org/api/search/${query}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.myBooks = data.books || [];
        this.currentPage = 1;
      } catch (error) {
        console.error("Greška pri dobijanju podataka sa API:", error);
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
