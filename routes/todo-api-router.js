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
    console.log('FUCK');
    console.log(recentTodo);
    res.status(200).json(recentTodo);

  });
});

//POST localhost:3000/api/phones
router.post('/todos', (req, res,next) => {

//   if (!req.user) {
//   res.status(401).json({ errorMessage: 'Not loged in.' });
//   return;
// }


const theTodo = new TodoModel({
  todo: req.body.todoName
  // timerHours: req.body.timerHours,
  // startTime: req.body.startTime,
});

console.log('hiiiiii');
console.log(theTodo);


  theTodo.save((err) => {
    if (theTodo.errors) {
      console.log('theErrorISHere');
          res.status(400).json({
            errorMessage: 'Validation failed',
            validationErrors: theTodo.errors
            });
        return;
  }

  if(err) {
    console.log('theErrorISHere   48');
    console.log('Error POSTING phone', err);
    res.status(500).json({ errorMessage: 'New phone went wrong 💩' });
  }

   res.status(200).json(theTodo);
    });
});

router.delete('/todos/:todoId', (req, res,next) => {
  if (!req.user) {
  res.status(401).json({ errorMessage: 'Not loged in.' });
  return;
}

TodoModel.findById(
  req.params.todoId,

  (err, todoFromDb) => {
    if (err) {
    console.log('Todo owner error', err);
    res.status(500).json({ errorMessage: 'Todo delete went wrong ' });
    return;
    }

    TodoModel.findByIdAndRemove(
      req.params.todoId,
      (err, todoFromDb) => {
        if (err) {
      console.log('Phone delete ERROR', err);
      res.status(500).json({ errorMessage: 'Todo delete went wrong ' });
      return;
        }
          res.status(200).json(phoneFromDb);
        }
      );
    }
  );
});

module.exports = router;
