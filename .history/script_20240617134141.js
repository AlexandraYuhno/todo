const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const task = document.getElementById('task')
const taskList =document.getElementById('taskList')


//Track click button 'Add'


function addTask(text, list){
    const newTask = document.createElement("div") 
    newTask.innerHTML = newInput.value;
    div.appendChild(newTask);
}

btnAdd.addEventListener("click", addTask()){}
btnAdd.addEventListener("enter", addTask())


const taskText = newInput.value

const taskHTML = ` <li class="todo__task" id="task">
              <label class="todo__checkbox"> 
                <input type="checkbox">
                </label>
             <div class="todo__task-title"> ${taskText}</div>
            </li>`