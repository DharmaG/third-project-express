const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema ({
  todo: {
    type: String,
    required: [true, 'What is your main goal today?']
  },
  timerHours: {
    type: Number
  },
  startTime: {
    type: Date
  },
  order: {
    type: Number
  }
});

const TodoModel= mongoose.model('Todo', todoSchema);

module.exports = TodoModel;
