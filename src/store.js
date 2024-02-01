import { createStore } from "vuex";

export default createStore({
  state: {
    textInput: "",
    myBooks: [],
    itemsPerPage: 3,
    currentPage: 1,
  },
  mutations: {
    SET_TEXT_INPUT(state, text) {
      state.textInput = text;
    },
    SET_MY_BOOKS(state, books) {
      state.myBooks = books;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    async fetchDataFromAPI({ commit }, query) {
      try {
        const apiUrl = `https://www.dbooks.org/api/search/${query}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        commit("SET_MY_BOOKS", data.books || []);
        commit("SET_CURRENT_PAGE", 1);
      } catch (error) {
        console.error("Greška pri dobijanju podataka sa API:", error);
      }
    },
    changePage({ commit, state }, page) {
      if (page >= 1 && page <= state.totalPages) {
        commit("SET_CURRENT_PAGE", page);
      }
    },
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.myBooks.length / state.itemsPerPage);
    },
    pages(state, getters) {
      const pagesArray = [];
      for (let i = 1; i <= getters.totalPages; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
    currentBooks(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.myBooks.slice(start, end);
    },
  },
});
