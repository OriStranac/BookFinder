import { createStore } from "vuex";

export default createStore({
  state: {
    textInput: "",
    itemsPerPage: 3,
    currentPage: 1,
    favoriteBooks: JSON.parse(localStorage.getItem("favoriteBooks")) || [],
    filteredBooks: [],
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.filteredBooks.length / state.itemsPerPage);
    },
    getFavoriteBooks: (state) => state.favoriteBooks,
  },
  mutations: {
    SET_FILTERED_BOOKS(state, books) {
      const filteredBook = books.filter((book) =>
        book.title.toLowerCase().includes(state.textInput.toLowerCase())
      );
      console.log(filteredBook, "test");
      state.filteredBooks = filteredBook;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_FAVORITES_BOOKS(state, books) {
      state.favoriteBooks = books;
    },
    SET_SORT_OPTION(state, option) {
      state.sortOption = option;
    },
    SET_TXT_INPUT(state, input) {
      state.textInput = input;
    }
  },
  actions: {
    async fetchDataFromAPI({ commit }, query) {
      commit("SET_TXT_INPUT", query);
      try {
        const apiUrl = `https://www.dbooks.org/api/search/${query}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        commit("SET_FILTERED_BOOKS", data.books || []);
        commit("SET_CURRENT_PAGE", 1);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },
    resetFilteredBooks({ commit }) { 
      commit("SET_FILTERED_BOOKS", []);
    },
    addToFavoritesAction({ commit, state }, book) {
      const isBookInFavorites = state.favoriteBooks.some(
        (favoriteBook) => favoriteBook.id === book.id
      );

      if (!isBookInFavorites) {
        const updatedFavorites = [...state.favoriteBooks, book];
        commit("SET_FAVORITES_BOOKS", updatedFavorites);
        localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
      } else {
        console.warn("Book already exists in favorites!");
      }
    },
    removeFromFavorites({ commit, state }, bookId) {
      const updatedFavorites = state.favoriteBooks.filter(
        (book) => book.id !== bookId
      );
      commit("SET_FAVORITES_BOOKS", updatedFavorites);
      localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    },
  },
});
