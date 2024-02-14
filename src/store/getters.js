export default {
    totalPages(state) {
        return Math.ceil(state.filteredBooks.length / state.itemsPerPage);
      },
    getFavoriteBooks: (state) => state.favoriteBooks,
}