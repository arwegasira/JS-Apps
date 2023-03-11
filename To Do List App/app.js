const express = require('express')

const app = express()
const port = process.env.PORT || 3000

//useful packages
require('dotenv').config()
app.use(express.static('./Todo-FrontEnd'))

//security packages
const cors = require('cors')
app.use(cors())

app.use(express.json())

//Db connection
const connect = require('./DB/connect')
//routes
const taskRoute = require('./Routes/task')
app.use('/api/v1', taskRoute)

const start = async () => {
  connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    })
    .catch((err) => console.log(err))
}

start()
