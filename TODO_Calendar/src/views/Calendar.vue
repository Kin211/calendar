

<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            days: [],
            weeks: [],
            month: dayjs().format('MMMM'),
            grade: [],
        }
    },
    async mounted() {
        await this.create();
        await this.getDays(dayjs().format('MMMM'));
        this.makeWeeks();
    },
    methods: {
        async create() {
            await axios.get('/create');
        },
        async getDays(month) {
            let res = await axios.get('/getDays', {params:{ month: month }});
            this.days = res.data;
        },
        makeWeeks() {
            let week = [];
            let grades = []
            for (let i = 0; i < this.days.length; i++) {
                if (this.days[i].weekDay != 0) {
                    week[this.days[i].weekDay - 1] = this.days[i].day;
                    grades[this.days[i].weekDay - 1] = this.days[i].grade;
                } else {
                    week[6] = this.days[i].day;
                    grades[6] = this.days[i].grade;
                    this.grade.push(grades)
                    this.weeks.push(week)
                    grades = []
                    week = [];
                }
            }
            week.length = 7;
            this.weeks.push(week)
            this.grade.push(grades)
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
        onHover(evt){
            evt.target.style.outline = '2px solid black';
        },
        anHover(evt){
            evt.target.style.outline = '';
        },
        async getGrade(day) {
            let resp = await axios.post('/getGrade',{
                day: day,
                month: this.month,
            });
            let gr = resp.data.grade;
            this.grade.push(gr);
            return gr;
        }
    },
}
</script>


<template>
    <div class="container1">
        <div id="calendar">
            <table class="table table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Понедельник</th>
                        <th>Вторник</th>
                        <th>Среда</th>
                        <th>Четверг</th>
                        <th>Пятница</th>
                        <th>Суббота</th>
                        <th>Воскресенье</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(week,ind) in weeks">
                        <td v-for="(day,index) in week"
                        v-bind:class="{
                            'red': this.grade[ind][index] == 1,
                            'orange': this.grade[ind][index] == 2,
                            'yellow': this.grade[ind][index] == 3,
                            'green': this.grade[ind][index] == 4,
                            'darkGreen': this.grade[ind][index] == 5,
                        }"
                        @mouseover="onHover" @mouseleave="anHover" @click="goTask(day, this.month)">{{ day }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<style>
.container1 {
    display: flex;
    justify-content: center;
}

#calendar {
    width: 70%;
}

td {
    height: 100px;
    width: 14%;
    vertical-align: text-top;
}

th {
    text-align: center;
}
.red {
    --bs-table-bg: #e06973;
}
.orange {
    --bs-table-bg: #feb272;
}
.yellow {
    --bs-table-bg: #ffda6a;
}
.green {
    --bs-table-bg: #8CB15F;
}
.darkGreen {
    --bs-table-bg: #198754;
}
</style>