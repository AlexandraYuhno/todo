const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const task = document.getElementById('task')
const taskList =document.getElementById('taskList')

let todoList = []

//Track click button 'Add'


function addTask(){
 const taskText = newInput.value
 const taskHTML = ` <li class="todo__task" id="task">
              <label class="todo__checkbox"> 
                <input type="checkbox">
                </label>
             <div class="todo__task-title"> ${taskText}</div>
            </li>`   
 taskList.insertAdjacentHTML("beforeend", taskHTML)
}

btnAdd.addEventListener("click", addTask())
btnAdd.addEventListener("enter", addTask())



            
            
/*const newTask = document.createElement("div") 
    newTask.innerHTML = newInput.value;
    div.appendChild(newTask)*/