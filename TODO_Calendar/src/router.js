import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import Calendar from './views/Calendar.vue'
import Tasks from './views/Tasks.vue'
import Today from './views/Today.vue'


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'calendar',
            component: Calendar,
        },
        {
            path: '/tasks/:day&:month',
            name: 'tasks',
            component: Tasks,
        },
        {
            path: '/today',
            name: 'today',
            component: Today,
        },
    ]
})