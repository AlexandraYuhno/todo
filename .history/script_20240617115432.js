const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const task = document.getElementById('task')

const tasks = []

//Track click button 'Add'


function addTask(text){
    const newTask = {
        text,
        isComplite: false
    }
    tasks.push(task)
    console.log(task)
}

btnAdd.addEventListener("click", addTask)