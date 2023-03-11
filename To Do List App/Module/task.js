const mongoose = require('mongoose')

const schema = mongoose.Schema

const taskSchema = new schema(
  {
    task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', taskSchema)
