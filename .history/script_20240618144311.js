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

    
    
doneTask = document.getElementById(item_${item.id});
    
todoList.forEach(function(item){
    if (doneTask.id === id) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is not checked');
    }
    })


//Changing the state of a task


 /*const 
)*/

/*const doneTask =  todoList.find(doneTask){
    if (doneTask.id === id) {
        return true
    }
}
console.log(doneTask)*/