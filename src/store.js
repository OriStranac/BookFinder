import { createStore } from "vuex";

export default createStore({
  state: {
    textInput: "",
    itemsPerPage: 3,
    currentPage: 1,
    favoriteBooks: JSON.parse(localStorage.getItem("favoriteBooks")) || [],
    filteredBooks: [],
    sortOption: "default",
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.filteredBooks.length / state.itemsPerPage);
    },
    getFavoriteBooks: (state) => state.favoriteBooks,
    sortedBooks: (state) => {
      if (state.sortOption === "alphabetical") {
        return state.filteredBooks
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title));
      }
      return state.filteredBooks.slice();
    },
  },
  mutations: {
    SET_FILTERED_BOOKS(state, books) {
      const filteredBooks = books.filter((book) =>
        state.textInput
          .toLowerCase()
          .split(" ")
          .some((word) =>
            book.title.toLowerCase().includes(word.toLowerCase().split(" "))
          )
      );
      console.log(filteredBooks);
      state.filteredBooks = filteredBooks;
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
        commit("SET_FILTERED_BOOKS", data.books || []);
        commit("SET_CURRENT_PAGE", 1);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
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
