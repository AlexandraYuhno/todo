const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const task = document.getElementById('task')

const tasks = []

//Track click button 'Add'


function addTask(text){
    const newTask = document.createElement(task)

    tasks.push(task)
    console.log(task)
}

btnAdd.addEventListener("click", addTask)
btnAdd.addEventListener("enter", addTask)