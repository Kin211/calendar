let express = require(`express`);
const dayjs = require('dayjs');
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/TODO');

//Схемы
let daySchema = new mongoose.Schema({
    month: String,
    weekDay: Number,
    day: Number,
    grade: Number,
});
let Day = mongoose.model('Day', daySchema);

let taskSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
    day: {
        type: mongoose.ObjectId,
        ref: 'Day'
    }
});
let Task = mongoose.model('task', taskSchema);

//Роуты
app.get('/create', async function (req, res) {
    let now = dayjs()
    let daysInMonth = now.daysInMonth();
    let month = now.format(`MMMM`);
    let sample = now.date(1);
    let has = await Day.find({ month: month })
    if (has.length) { res.send('already been') }
    else {
        for (let i = 1; i <= daysInMonth; i++) {
            let day = new Day({
                month: month,
                weekDay: +(sample.format('d')),
                day: i,
                grade: 0,
            })
            await day.save();
            sample = sample.date(i + 1);
        }
        res.send(`created`)
    }
});

app.get('/getDays', async function(req,res){
    let month = req.query.month;
    let responce = await Day.find({month:month});  
    res.send(responce)
});

app.post('/getTasks', async function(req,res){
    let month = req.body.month; 
    let day = req.body.day; 
    let dbDay = await Day.findOne({ 
        month: month,
        day: day,
    });
    let tasks = await Task.find({day: dbDay._id});
    res.send(tasks);
});

app.post('/addTask', async function(req,res){
    let day = req.body.day;
    let month = req.body.month; 
    let title = req.body.title;
    let comp = req.body.complete;
    let dbDay = await Day.findOne({ 
        month: month,
        day: day,
    });
    let task = new Task({
        day: dbDay._id,
        task: title,
        completed: comp,
    });
    await task.save();
});

app.post('/change', async function(req,res){
    let task = req.body.task;
    let dbTask = await Task.findOne({_id:task._id});
    if (dbTask.completed){dbTask.completed = false}
    else {dbTask.completed = true};
    await dbTask.save();
    res.send(`change`);
});

app.post('/delete', async function(req,res){
    let task = req.body.task;
    await Task.deleteOne({_id:task._id});
    res.send('deleted');
});

app.post('/gradeUpdate', async function(req,res){
    let month = req.body.month; 
    let day = req.body.day; 
    let grade = req.body.grade;
    let dbDay = await Day.findOne({ 
        month: month,
        day: day,
    });
    dbDay.grade = grade;
    await dbDay.save();
});

app.post('/getGrade', async function(req,res){
    let month = req.body.month; 
    let day = req.body.day; 
    let dbDay = await Day.findOne({ 
        month: month,
        day: day,
    });
    res.send(dbDay); 
});