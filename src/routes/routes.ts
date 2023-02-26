import { RouteRecordRaw } from "vue-router"
import Home from '../pages/Home.vue'
import Pokemon from '../pages/Pokemon.vue'
import routeNames from "./routeNames"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: routeNames.HOME,
    component: Home
  },
  {
    path: '/pokemon/:id',
    name: routeNames.POKEMON,
    component: Pokemon
  }
]

export default routes