const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const task = document.getElementById('task')


//Track click button 'Add'


function addTask(){
    const newTask = document.createElement("div") 
    newTask.innerHTML = newInput.value;
    task.appendChild(newTask);
}

btnAdd.addEventListener("click", addTask)
btnAdd.addEventListener("enter", addTask)