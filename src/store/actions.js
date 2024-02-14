export default {
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
};
