const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT || 3000

const Task = require("./models/Tasks.js");



const app = express()

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*',
}));

mongoose.connect(process.env.MONGO_URL).then(() => console.log("success"));

app.post('/kanban/addtask', async (req, res) => {
    const { title, description, taskStatus } = req.body;
    const TaskDoc = await Task.create({ title, description, taskStatus });
    res.json({ TaskDoc });
});

app.get('/kanban/gettasks', async (req, res) => {
    res.json(await Task.find());
});

app.post('/kanban/getsingletask', async (req, res) => {
    const reqDoc = req.body.id;
    const doc = await Task.findById({_id: reqDoc});
    res.json(doc);
});

app.post('/kanban/updatetask', async (req, res) => {
    const { _id, title, description, taskStatus } = req.body;
    const doc = await Task.findByIdAndUpdate(_id, {title: title, description: description, taskStatus: taskStatus});

    res.json(doc);
})

app.post('/kanban/deletetask', async (req, res) => {
    const deleteDoc = req.body.id;

    try {
        Task.deleteOne({ _id: deleteDoc }).then((doc) => {
        
            res.json({doc});
            
        }).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {

    }
    
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})