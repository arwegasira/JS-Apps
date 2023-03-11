const express = require('express')
const router = express.Router()
const {
  createTask,
  deleteTask,
  filterTask,
  deleteAllTask,
  getAllTasks,
} = require('../Controller/task')

router.route('/task').post(createTask).get(getAllTasks)
router.delete('/task/:id', deleteTask)
router.get('/task/deleteall', deleteAllTask)
router.post('/task/filter', filterTask)
module.exports = router
