const newInput = document.getElementById('newInput');  
const btnAdd = document.getElementById('btnAdd');
const taskList = document.getElementById('taskList');

let todoList = [];


// Drawing a new task in the task list

let taskRender = () =>{ 
    
    let taskHTML =""
    todoList.forEach((item, i) => {
      taskHTML += `<li class="todo__task">
                        <label class="todo__checkbox"> 
                             <input type="checkbox" data-id="${item.id}" ${item.isCompleted ? "checked" : ""} >
                        </label >
                        <div class="todo__task-title"> ${item.text}</div>
                    </li>`   ;
        taskList.innerHTML = taskHTML;
    }
)}

//Track click button 'Add'

btnAdd.addEventListener("click", addTask = () =>{
    let newTodo = {
        id: Date.now(),
        text: newInput.value,
        isCompleted:false,
        };
    todoList.push(newTodo);
    taskRender()
});


// Сhanging the state of the task

taskList.addEventListener("click", checkDone = (event) => {
   
    const element = event.target;
    const activeTaskId = element.getAttribute('data-id');
    const checkedId = Number(activeTaskId);
    const taskClick = todoList.find((item) => item.id == checkedId);
    taskClick.isCompleted = !taskClick.isCompleted;
    taskRender()
}
)
    


