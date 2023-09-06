const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: String,
    description: String,
    taskStatus: Number,
});


const TaskModel = mongoose.model('Tasks', TaskSchema);

module.exports = TaskModel;

