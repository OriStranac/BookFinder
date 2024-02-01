import { createStore } from "vuex";

export default createStore({
  state: {
    textInput: "",
    myBooks: [],
    itemsPerPage: 3,
    currentPage: 1,
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.myBooks.length / state.itemsPerPage);
    },
  },
  mutations: {
    SET_TEXT_INPUT(state, value) {
      state.textInput = value;
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
        console.error("Error fetching data from API:", error);
      }
    },
  },
});
