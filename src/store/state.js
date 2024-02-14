export default {
  textInput: "",
  itemsPerPage: 3,
  currentPage: 1,
  favoriteBooks: JSON.parse(localStorage.getItem("favoriteBooks")) || [],
  filteredBooks: [],
};
