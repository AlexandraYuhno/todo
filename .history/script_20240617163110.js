const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const taskList =document.getElementById('taskList');

let todoList = [];

//Track click button 'Add'


function showTasks(){ 
    

    todoList.forEach(function(item, i){
      const  taskHTML = ` <li class="todo__task">
                        <label class="todo__checkbox"> 
                             <input type="checkbox">
                        </label>
                        <div class="todo__task-title"> ${newInput.value}</div>
                     </li>`   ;
    }
)}


btnAdd.addEventListener("click", function addTask(){
    let newTodo = {
        text: newInput.value,
        isCompleted:false,
        };
    todoList.push(newTodo);
    showTasks()
});


        /*
        
    const taskText = newInput.value 
    let taskHTML = ""
    
    taskHTML += ` <li class="todo__task">
                        <label class="todo__checkbox"> 
                             <input type="checkbox">
                        </label>
                        <div class="todo__task-title"> ${taskText}</div>
                     </li>`   ;
    
    text.innerHTML = taskHTML;  
*/
