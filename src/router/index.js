import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Duel from '../views/Duel.vue'
import Engine from '../views/Engine.vue'
import Puzzles from '../views/Puzzles.vue'
import Training from '../views/Training.vue'
import Statistics from '../views/Statistics.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/duel',
        name: 'Duel',
        component: Duel
    },
    {
        path: '/training',
        name: 'Training',
        component: Training
    },
    {
        path: '/puzzles',
        name: 'Puzzles',
        component: Puzzles
    },
    {
        path: '/engine',
        name: 'Engine',
        component: Engine
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router