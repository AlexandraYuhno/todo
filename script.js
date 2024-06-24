const newInput = document.getElementById('newInput');  
const btnAdd = document.getElementById('btnAdd');
const taskList = document.getElementById('taskList');


let todoList = [{id: Date.now(),
    text: "Задача 1",
    isCompleted:true,
    isEdit: false},
    {id: Date.now() + 3,
    text: "Задача 2",
    isCompleted:false,
    isEdit: false} 
 ]  ;


// Drawing a new task in the task list

let taskRender = () =>{ 
    
    let taskHTML =""
    todoList.forEach((item) => {
        taskHTML +=`<li class="todo__task" data-id="${item.id}">
            <label class="todo__checkbox"> 
                <input data-active="checkbox" type="checkbox" class="checkbox"
                ${item.isCompleted ? "checked" : ""} >
            </label >
            <input value="${item.text}" type="text" class='editText' ${!item.isEdit ? 'hidden' : "" }>
            <div class="todo__task-title" ${item.isEdit ? 'hidden' : ""}>${item.text}</div>
         </li>`;

        taskList.innerHTML = taskHTML;
    })
}

// Add task  /*  <input type="text" ${item.text}>

let addTask= () => {
    let newTodo = {
        id: Date.now(),
        text: newInput.value,
        isCompleted: false,
        isEdit: false,
        };
    todoList.push(newTodo);
    taskRender()
}


// Сhanging the state of the task

let checkDone = (event) => {
    const element = event.target.closest('.todo__task');
    const activeTaskId = element.getAttribute('data-id');
    const checkedId = Number(activeTaskId);
    const taskClick = todoList.find((item) => item.id == checkedId);
    taskClick.isCompleted = !taskClick.isCompleted;

    /*const activeCheckbox = checkboxClick.getAttribute('data-active');
    const checkboxClick = element.querySelector('.todo__checkbox .checkbox');
    if(activeCheckbox == "checkbox"){
        
    }*/
    taskRender()
}



//Editing a task

let editTask = (event) => {  
    const element = event.target.closest('.todo__task');
    const editTask = element.getAttribute('data-id');
    const editId = Number(editTask);
    const editText = todoList.find((item) => item.id == editId);
    editText.isEdit = true;
    let editInput = element.querySelector('.editText').value;
    editText.text = editInput;
    if(event.key == 13) {  
    /*todoList =  todoList.map((item)=> item.text = editInput )*/
    /*console.log(editInput);*} else if (event.key == 27){*/ }
    taskRender()
}


taskList.addEventListener("dblclick", editTask);
btnAdd.addEventListener("click", addTask);
taskList.addEventListener("click", checkDone);