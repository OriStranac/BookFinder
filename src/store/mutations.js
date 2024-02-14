export default {
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
      },
}