const newInput = document.getElementById('newInput');  //entry field
const btnAdd = document.getElementById('btnAdd'); //add button
const taskList = document.getElementById('taskList'); //task list ul

// Displaying the added task in the task list

let todoList = [{id: Date.now(),
    text: "Задача 1",
    isCompleted:true,
    },
    {id: Date.now() + 3,
    text: "Задача 2",
    isCompleted:false,
    } 
 ]  ;


// Drawing a new task in the task list

let taskRender = () =>{ 
    
    let taskHTML = " "
    todoList.forEach((item) => {
        taskHTML +=`<li class="todo__task" data-id="${item.id}">
            <label class="todo__checkbox"> 
                <input data-active="checkbox" type="checkbox" class="checkbox"
                ${item.isCompleted ? "checked" : ""} >
            </label >
            <input value="${item.text}" type="text" class='editText' hidden>
            <div class="todo__task-title">${item.text}</div>
         </li>`;

        taskList.innerHTML = taskHTML;
        newInput.value = "";
    })
}

// Add task 

let addTask = () => {
    let newTodo = {
        id: Date.now(),
        text: newInput.value,
        isCompleted: false,
        };
    todoList.push(newTodo);
    taskRender()
}

let addByEnter = (event) => {
    if(event.code == 'Enter') {
        let newTodo = {
            id: Date.now(),
            text: newInput.value,
            isCompleted: false,
            };
        todoList.push(newTodo);
        taskRender()
    }
}

// Сhanging the state of the task

let checkDone = (event) => {
    const element = event.target.closest('.todo__task');
    const activeTaskId = element.getAttribute('data-id');
    const checkedId = Number(activeTaskId);
    const taskClick = todoList.find((item) => item.id == checkedId);
    taskClick.isCompleted = !taskClick.isCompleted;
    taskRender()
}


let switchClick= (event) => {
    const element = event.target.closest('.todo__task');
    const liLabel = element.childNodes[1];
    if(event.target == liLabel.childNodes[1]){
        checkDone(event);
    }
  
}
//Editing a task

let switchDblClick = (event) => {
    const element = event.target.closest('.todo__task');
    element.childNodes[3].hidden = false;
    element.childNodes[5].hidden = true;
    element.childNodes[3].focus();

}

// Saving with enter and blur, undoing changes with escape

let pressKey = (event) =>{
    const element = event.target.closest('.todo__task');
    const inputSave = element.childNodes[3];
    const taskTitle = element.childNodes[5];
    if(event.target == inputSave){
        if(event.code == 'Enter') {  
            const editTask = element.getAttribute('data-id');
            console.log(editTask);
            const editId = Number(editTask);
            const editText = todoList.find((item) => item.id == editId);
            editText.text = inputSave.value;
            taskRender()
        } else if (event.keyCode == 27){
            taskRender() 
        }
    }
}

let blurOn = (event)=>{
    const element = event.target.closest('.todo__task');
    const inputSave = element.childNodes[3];
    console.log(element)
    if(event.target == inputSave){
        const editTask = element.getAttribute('data-id');
        const editId = Number(editTask);
        const editText = todoList.find((item) => item.id == editId);
        editText.text = inputSave.value;
        taskRender()
    }
}

taskList.addEventListener('keydown', pressKey);
taskList.addEventListener('blur', blurOn);
taskList.addEventListener("click", switchClick);
taskList.addEventListener("dblclick", switchDblClick);
newInput.addEventListener('keydown', addByEnter);
btnAdd.addEventListener("click", addTask);
