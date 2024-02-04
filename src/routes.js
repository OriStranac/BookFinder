import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue'
import BookDetails from './components/BookDetails.vue'
import FavouritesBooks from './components/FavouritesBooks.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/book/:id",
    name: "book-details",
    component: BookDetails,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavouritesBooks,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
