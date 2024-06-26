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
    
    let taskHTML =""
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
    })
}

// Add task  /*  <input type="text" ${item.text}>

let addTask= () => {
    let newTodo = {
        id: Date.now(),
        text: newInput.value,
        isCompleted: false,
        };
    todoList.push(newTodo);
    taskRender()
}


// Сhanging the state of the task

/*let checkDone = (event) => {
    const element = event.target.closest('.todo__task');
    const activeTaskId = element.getAttribute('data-id');
    const checkedId = Number(activeTaskId);
    const taskClick = todoList.find((item) => item.id == checkedId);
    taskClick.isCompleted = !taskClick.isCompleted;

    /*const activeCheckbox = checkboxClick.getAttribute('data-active');
    const checkboxClick = element.querySelector('.todo__checkbox .checkbox');
    if(activeCheckbox == "checkbox"){
        
    }
    taskRender()
}*/

// Saving with enter and blur, undoing changes with escape
//Editing a task

let editTask = (event) => {  
    const element = event.target.closest('.todo__task');
    const inputSave = element.querySelector('.editText');
    const taskTitle = element.querySelector('.todo__task-title');
    inputSave.hidden = false;
    taskTitle.hidden = true; 
    
   inputSave.addEventListener('keydown', function pressKey(event){
        if( event.code == 'Enter'  ) {  
            const editTask = element.getAttribute('data-id');
            const editId = Number(editTask);
            const editText = todoList.find((item) => item.id == editId);
            let editInput = element.querySelector('.editText').value;
            editText.text = editInput;
            inputSave.removeEventListener('keydown', pressKey);
            taskRender()
        } else if (event.keyCode == 27){
                inputSave.hidden = true;
                taskTitle.hidden = false;
                inputSave.removeEventListener('keydown', pressKey);
                taskRender() 
        }
    })
   
    inputSave.addEventListener('blur', function blurOn(){
        const editTask = element.getAttribute('data-id');
            const editId = Number(editTask);
            const editText = todoList.find((item) => item.id == editId);
            let editInput = element.querySelector('.editText').value;
            editText.text = editInput;
        inputSave.removeEventListener('keydown', blurOn);
        taskRender()
   })
}

taskList.addEventListener("dblclick", editTask);
btnAdd.addEventListener("click", addTask);
/*taskList.addEventListener("click", checkDone);*/
