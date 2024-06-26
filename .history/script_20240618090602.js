const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const taskList =document.getElementById('taskList');

let todoList = [];




function showTasks(){ 
    
    let taskHTML =""
    todoList.forEach(function(item, i){
      taskHTML += ` <li class="todo__task">
                        <label class="todo__checkbox" for = id "item_${i}" checked = ${item.isCompleted}> 
                             <input type="checkbox" id= "item_${i}">
                        </label>
                        <div class="todo__task-title"> ${item.text}</div>
                     </li>`   ;
        taskList.innerHTML = taskHTML;
    }
)}

//Track click button 'Add'

btnAdd.addEventListener("click", function addTask(){
    let newTodo = {
        id: Data.now
        text: newInput.value,
        isCompleted:false,
        };
    todoList.push(newTodo);
    showTasks()
});
