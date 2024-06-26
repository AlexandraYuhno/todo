const newInput = document.getElementById('newInput');  //entry field
const btnAdd = document.getElementById('btnAdd'); //add button
const taskList = document.getElementById('taskList'); //task list ul


let todoList = [];


// Displaying the added task in the task list

function taskRender(){ 
    
    let taskHTML =""
    todoList.forEach(function(item){
      taskHTML += ` <li class="todo__task" >
                        <label class="todo__checkbox"  checked = ${item.isCompleted}> 
                             <input type="checkbox" data-id="${item.id}" >
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

taskList.addEventListener("click", function checkDone(event){
    const element = event.target;
    const checkedId = element.getAttribute('data-id');
    const activeTask = todoList.find((item) => item.id === checkedId);

    

   /* const state = element.getAttribute('data-checked');
    if(state){
        state.checked
    } else { ""
        };*/
    console.log(activeTask)
    console.log(checkedId)
   taskRender()
})
    

