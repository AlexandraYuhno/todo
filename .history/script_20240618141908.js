const newInput = document.getElementById('newInput');  //entry field
const btnAdd = document.getElementById('btnAdd'); //add button
const taskList = document.getElementById('taskList'); //task list ul

let todoList = [];


// Displaying the added task in the task list

function taskRender(){ 
    
    let taskHTML =""
    todoList.forEach(function(item){
      taskHTML += ` <li class="todo__task">
                        <label class="todo__checkbox" checked = ${item.isCompleted}> 
                             <input type="checkbox" id= "item_${item.id}">
                        </label>
                        <div class="todo__task-title"> ${item.text}</div>
                     </li>`   ;
        taskList.innerHTML = taskHTML;
    }
)


//Changing the state of a task


 /*const doneTask = document.getElementById(item.id);
    todoList.forEach(function(item){
    if (doneTask.checked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is not checked');
    }
    }
)*/

const doneTask =  todoList.find(doneTask){
    if (doneTask.id === id) {
        return true
    }
}
console.log(doneTask)
}



//Track click button 'Add'
btnAdd.addEventListener("click", function addTask(){
   
    let newTodo = {
        text: newInput.value,
        isCompleted:false,
        id:Date.now()
        };
    todoList.push(newTodo);
    taskRender()
});



const 