const newInput = document.getElementById('newInput');  
const btnAdd = document.getElementById('btnAdd');
const taskList = document.getElementById('taskList');


let todoList = [{id: Date.now(),
    text: "Задача 1",
    isCompleted:true,},
    {id: Date.now() + 3,
    text: "Задача 2",
    isCompleted:false,} 
 ]  ;


// Drawing a new task in the task list

let taskRender = () =>{ 
    
    let taskHTML =""
    todoList.forEach((item) => {
        taskHTML +=`<li class="todo__task" data-type = "${item.isEdit}">
            <label class="todo__checkbox"> 
                <input type="checkbox" data-id="${item.id} data-action = "check"
                ${item.isCompleted ? "checked" : ""} >
            </label >
            <input type="text" id='editText' ${item.isEdit}>
            <div class="todo__task-title" data-action = "edit">${item.text}</div>
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
    let listTask = event.target.closest('.todo__task');
    const text = listTask.querySelector('.todo__task-title')
    /*let action = event.target.dataset.action;*/
    const editText = document.getElementById('editText');
    editText.value = text.textContent; 
    editText.isEdit = true; 
    console.log(editText.isEdit)
    /*if(event.key === 'Enter') {
        alert(editText.value);}*/
    
}


taskList.addEventListener("dblclick", editTask);
btnAdd.addEventListener("click", addTask);
taskList.addEventListener("click", checkDone);

 
