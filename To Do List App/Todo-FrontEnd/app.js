//UI variable
const taskInput = document.querySelector('#task-input')
const list = document.querySelector('ul')
const clearbtn = document.getElementById('clear-task')
const form = document.querySelector('#task-form')
const filter = document.querySelector('#filter-task')

form.addEventListener('submit', addTaskV3)
list.addEventListener('click', deleteTask)
clearbtn.addEventListener('click', clearTask)
filter.addEventListener('input', filterTask)
window.addEventListener('load', getAllTasks)

function addTask(e) {
  const inputValue = taskInput.value
  if (inputValue === '') {
    alert('Please add a task')
    return
  }
  //create li
  const li = document.createElement('li')
  li.classList.add('collection-item')
  //create a span element
  const span = document.createElement('span')
  span.textContent = inputValue
  // span.appendChild(document.createTextNode(inputValue))
  //append span to li
  li.appendChild(span)
  //create link element
  const link = document.createElement('a')
  const icon = document.createElement('i')
  icon.className = 'fa-sharp fa-solid fa-xmark'
  link.appendChild(icon)
  //append link to li
  li.appendChild(link)

  //append li to ul
  list.appendChild(li)
  //clear input value
  taskInput.value = ''
  e.preventDefault()
}

function addTaskV2(e) {
  const task = taskInput.value
  if (task === '') {
    alert('Please add a task')
  } else {
    //create li
    const li = document.createElement('li')
    li.classList.add('collection-item')
    li.innerHTML = `
    <span>${task}</span>
    <a href""><i class="fa-sharp fa-solid fa-xmark"></i></a>
    `
    //append li to ul
    list.appendChild(li)
    //clear input
    taskInput.value = null
  }

  e.preventDefault()
}

async function addTaskV3(e) {
  e.preventDefault()
  if (taskInput.value === '') {
    alert('Please enter a task')
  } else {
    //fetch api to write task to DB
    const url = 'http://localhost:3000/api/v1/task'
    const data = { task: taskInput.value }
    const request = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const responseJson = await request.json()

    //create li from response
    const li = document.createElement('li')
    li.setAttribute('taskId', responseJson._id)
    li.innerHTML = `
    <span>${responseJson.task}</span>
     <a href""><i class="fa-sharp fa-solid fa-xmark"></i></a>
     `
    //append li to ul
    list.appendChild(li)
    //clear input
    taskInput.value = null
  }
}

async function deleteTask(e) {
  if (e.target.parentElement.tagName === 'A') {
    const id = e.target.parentElement.parentElement.getAttribute('taskId')
    const url = `http://localhost:3000/api/v1/task/${id}`
    const request = await fetch(url, {
      method: 'DELETE',
    })
    if (request.ok) {
      e.target.parentElement.parentElement.remove()
    }
  }

  e.preventDefault()
}

async function clearTask(e) {
  //remove all tasks
  const url = `http://localhost:3000/api/v1/task/deleteall`
  const request = await fetch(url)
  if (request.ok) {
    list.innerHTML = ''
  }

  e.preventDefault()
}
async function filterTask(e) {
  const value = filter.value.toLowerCase()
  const url = `http://localhost:3000/api/v1/task/filter`
  const urlAllTask = `http://localhost:3000/api/v1/task`

  //remove all tasks on the ul
  list.innerHTML = ''
  //apply filter
  if (value === '') {
    // return all documents
    const response = await fetch(urlAllTask, {
      headers: { 'Content-Type': 'application/json' },
    })
    const responseJson = await response.json()
    createListItem(responseJson)
    const url = `http://localhost:3000/api/v1/task`
  } else {
    //search for matching documents
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: value }),
    })
    const responseJson = await response.json()
    createListItem(responseJson)
  }
}

function createListItem(response) {
  //remove all tasks on the ul
  list.innerHTML = ''
  response.forEach((element) => {
    const li = document.createElement('li')
    //create a span
    const span = document.createElement('span')
    span.textContent = element.task
    //create link
    const link = document.createElement('a')
    link.innerHTML = `<i class="fa-sharp fa-solid fa-xmark">`
    //append to li
    li.appendChild(span)
    li.appendChild(link)
    li.setAttribute('taskId', element._id)
    //append to ul
    list.appendChild(li)
  })
}

async function getAllTasks(e) {
  e.preventDefault()
  const url = `http://localhost:3000/api/v1/task`
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })
  const responseJson = await response.json()
  createListItem(responseJson)
}
