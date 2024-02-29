<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            tasks: [],
            day: this.$route.params.day,
            month: this.$route.params.month,
            newTask: '',
            complete: false,
            grade: 0,
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
        async addTask() {
            await axios.post(`/addTask`, {
                day: this.day,
                month: this.month,
                title: this.newTask,
                complete: this.complete,
            })
        },
        async change(task) {
            await axios.post('/change', {
                task: task,
            });
            this.loadTasks();
        },
        async del(task) {
            await axios.post('/delete', {
                task: task,
            });
            this.loadTasks();
        },
        async gradeUpd() {
            await axios.post('/gradeUpdate',{
                day: this.day,
                month: this.month,
                grade: this.grade,
            })
        },
        async getGrade() {
            let resp = await axios.post('/getGrade',{
                day: this.day,
                month: this.month,
            });
            this.grade = resp.data.grade;
        }
    },
    mounted() {
        this.loadTasks();
        this.getGrade()
    }
}
</script>

<template>
    <div class="container">
        <form>
            <div class="my-4">
                <label for="select" class="form-label">Оценка дня</label>
                <select @change="gradeUpd" v-model="grade" id="select" class="form-select">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <ul class="list-group">
                <li v-for="(task, index) in tasks" class="list-group-item">
                    <input @change="change(task)" class="form-check-input me-1" v-bind:checked="task.completed"
                        type="checkbox" value="" aria-label="...">
                    <span :class="{ 'completed': task.completed }">
                        {{ task.task }}</span>
                    <button @click.prevent="del(task)" type="button" class="btn btn-sm btn-danger">X</button>
                </li>
            </ul>
        </form>
        <form @submit="addTask">
            <div class="border border-ligth border-1 rounded p-3 my-4">
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Добавить задачу</label>
                    <input type="text" v-model="newTask" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" v-model="complete" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Выполнена?</label>
                </div>
                <button type="submit" class="btn btn-secondary">Добавить задачу</button> 
            </div>
        </form>
    </div>
</template>


<style>
.container {
    width: 80%;
}

.completed {
    text-decoration: line-through;
}
</style>