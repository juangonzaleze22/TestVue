import Vue from 'vue'
import Router from 'vue-router';
import Characters from './pages/characters';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'characters',
      component: Characters
    },
  ]
})
