const Task = require('../Module/task')
const { StatusCodes } = require('http-status-codes')

const createTask = async (req, res, next) => {
  let { task } = req.body
  task = new Task({ task: task })
  await task.save()
  res.status(StatusCodes.OK).json(task)
}

const deleteTask = async (req, res, next) => {
  const { id } = req.params
  const task = await Task.findOneAndDelete({ _id: id })
  res.status(StatusCodes.OK).json(task)
}
const deleteAllTask = async (req, res, next) => {
  const tasks = await Task.deleteMany({})
  res.status(StatusCodes.OK).json(tasks)
}

const filterTask = async (req, res, next) => {
  const { task } = req.body
  const tasks = await Task.find({ $text: { $search: task, $language: 'none' } })
  res.status(StatusCodes.OK).json(tasks)
}

const getAllTasks = async (req, res, next) => {
  const tasks = await Task.find()
  res.status(StatusCodes.OK).json(tasks)
}

module.exports = {
  createTask,
  deleteTask,
  filterTask,
  deleteAllTask,
  getAllTasks,
}
