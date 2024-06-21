const newInput = document.getElementById('newInput');  
const btnAdd = document.getElementById('btnAdd');
const taskList = document.getElementById('taskList');


let todoList = [ ]  ;


// Drawing a new task in the task list

let taskRender = () =>{ 
    
    let taskHTML =""
    todoList.forEach((item) => {
        taskHTML +=`<li class="todo__task" data-type = "${item.isEdit}">
            <label class="todo__checkbox"> 
                <input type="checkbox" data-id="${item.id}" 
                ${item.isCompleted ? "checked" : ""} >
            </label >
            <input type="${item.text}">
            <div class="todo__task-title"> ${item.text}</div>
         </li>`;

        taskList.innerHTML = taskHTML;
    }

)}


// Add task  /*  <input type="text" ${item.text}>

let addTask= () =>{
    let newTodo = {
        id: Date.now(),
        text: newInput.value,
        isCompleted: false,
        isEdit: true,
        };
    todoList.push(newTodo);
    taskRender()}


// Сhanging the state of the task
   let checkDone = (event) => {
        const element = event.target;
        const activeTaskId = element.getAttribute('data-id');
        const checkedId = Number(activeTaskId);
        const taskClick = todoList.find((item) => item.id == checkedId);
        taskClick.isCompleted = !taskClick.isCompleted;
        taskRender()
    }



//Editing a task

let editTask = (event) => {  
    let taskContent = todoList.text; 
    const element = event.target.parentElement;

        console.log(element)

    const activeTaskType = element.getAttribute('data-type');
  
    const taskDblClick = todoList.find((item) => item.isEdit == activeTaskType);
    taskDblClick.isEdit = true;
    console.log(taskDblClick)
  /* if(taskContent){
        item.text = ""
    }*/
}


taskList.addEventListener("dblclick", editTask);
btnAdd.addEventListener("click", addTask);
taskList.addEventListener("click", checkDone);

 
