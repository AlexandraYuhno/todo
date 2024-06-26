const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const taskList =document.getElementById('taskList');

let todoList = [];

//Track click button 'Add'


function showTasks(){ 
    

    todoList.forEach(function(item, i){
      let taskHTML = ` <li class="todo__task">
                        <label class="todo__checkbox"> 
                             <input type="checkbox" id= "item_${i}">
                        </label for = 'id= "item_${i}">
                        <div class="todo__task-title"> ${item.text}</div>
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
