<script>
import dayjs from 'dayjs';
import axios from 'axios';
export default {
    data() {
        return {
            day: dayjs().format('D'),
            month: dayjs().format('MMMM'),
            tasks: [],
        }
    },
    methods: {
        async loadTasks() {
            let resp = await axios.post(`/getTasks`, {
                day: this.day,
                month: this.month,
            });
            this.tasks = resp.data;
        },
        goTask(day,month) {
            this.$router.push({
                name: 'tasks',
                params: {
                    day: day,
                    month: month,
                }
            })
        },
    },
    mounted(){
        this.loadTasks()
    }
}
</script>

<template>
    <div class="container">
        <ul class="list-group">
            <li v-if="tasks[0]"
            v-for="task in tasks"
            :class="{'disabled': task.completed,'list-group-item':true}"
             aria-current="true">{{ task.task }}</li>
             <h2 v-else> Задач на сегодня нет</h2>
        </ul>
        <button @click="goTask(this.day, this.month)" class="btn btn-secondary my-3">Редактировать задачи</button>
    </div>
</template>


<style>
.container {
    width: 80%;
}
</style>