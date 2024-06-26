const newInput = document.getElementById('newInput');  //поле ввода
const btnAdd = document.getElementById('btnAdd'); //кнопка добавить
const taskList = document.getElementById('taskList'); //список задач ul

let todoList = [];


// Displaying the added task in the task list

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
   
   const timestamp = Data.now()
    let newTodo = {
        id: timestamp,
        text: newInput.value,
        isCompleted:false,
        };
    todoList.push(newTodo);
    showTasks()
});

todoList.filter(function(){

})