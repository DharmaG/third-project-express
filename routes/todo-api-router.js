const express = require('express');

const TodoModel = require('../models/todo-model');

const router = express.Router();

router.get('/todos', (req, res, next) => {
  TodoModel.find()
  .exec((err, recentTodo) => {
    if (err) {
      console.log('Error finding todos', err)
      res.status(500).json({ errorMessage: 'Finding TodoModel went wrong' });
      return;
    }

    res.status(200).json(recentTodo);

  });
});

//POST localhost:3000/api/phones
router.post('/todos', (req, res,next) => {
  if (!req.user) {
  res.status(401).json({ errorMessage: 'Not loged in.' });
  return;
}

const theTodo = new TodoModel({
  todo: req.body.todoName,
  timerHours: req.body.timerHours,
  startTime: req.body.startTime,
});

  theTodo.save((err) => {
    if (theTodo.errors) {
  res.status(400).json({
    errorMessage: 'Validation failed',
    validationErrors: theTodo.errors
  });
    return;
  }

  if(err) {
    console.log('Error POSTING phone', err);
    res.status(500).json({ errorMessage: 'New phone went wrong 💩' });
  }

   res.status(200).json(theTodo);
    });
});

module.exports = router;
