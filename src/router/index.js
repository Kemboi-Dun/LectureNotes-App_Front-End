import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home_Page.vue'
import Units_Page from '../views/Units_Page.vue'
import Folders_Page from '../views/Folders_Page.vue'
import Documents_Page from '../views/Documents_Page.vue'
import Signin_Page from '../views/Signin_Page.vue'
import Login_Page from '../views/Login_Page.vue'
import LandingPage from '../views/LandingPage.vue'
import Type from '../components/Type.vue'
import SubjectsFiles from '../components/SubjectsFiles.vue'
import Subjects from '../views/Subjects.vue'
import Dashboard from '../Admin/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'home_page',
      component: HomeView
    },
    {
      path: '/year/:year_id/course/:course_id/course_type/:course_type_id/semester/:semester_id/units',
      name: 'units',
      component: Units_Page,
    },
    {
      path: '/year/:year_id/course/:course_id/course_type/:course_type_id/semester/:semester_id/units/:unit_id/folders',
      name: 'folders',
      component: Folders_Page,
    },
    {
      path: '/year/:year_id/course/:course_id/course_type/:course_type_id/semester/:semester_id/units/:unit_id/folders/:folder_id/documents',
      name: 'documents',
      component: Documents_Page,
    },
    {
      path: '/signin_page',
      name: 'register',
      component: Signin_Page,
    },
    {
      path: '/login_page',
      name: 'login',
      component: Login_Page,
    },
    {
      path: '/types_page/:type',
      name: 'types',
      component: Subjects,
    },
    {
      path: '/admin/:id',
      name: 'admin',
      component: Dashboard,
    }
  ]
})

export default router
