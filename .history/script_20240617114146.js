const newTask = document.getElementById('new');
const btnAdd = document.getElementById('btnAdd');

const tasks = []

//Track click button 'Add'


function addTask(text){
    alert("ok")
}

btnAdd.addEventListener("click", addTask){
    const task = newTask.value
    if(task){
        addTask(task)
    }
}