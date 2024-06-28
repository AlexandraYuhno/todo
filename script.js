const newInput = document.getElementById("newInput"); //entry field
const btnAdd = document.getElementById("btnAdd"); //add button
const taskList = document.getElementById("taskList"); //task list ul
const btnDelAll = document.getElementById("btnDelAll"); //del button
const checkAll = document.getElementById('checkAll');
const btnShowActive = document.getElementById('btnShowActive');
const btnShowAll = document.getElementById('btnShowAll');
const btnShowComplete = document.getElementById('btnShowComplete');
const todoShow = document.getElementById('todoShow');

let tab = 'all'


// Displaying the added task in the task list

let todoList = [
  { id: Date.now(), text: "Задача 1", isCompleted: true },
  { id: Date.now() + 3, text: "Задача 2", isCompleted: false },
];


let sumTodo = () =>{
  btnShowAll.textContent = `All (${todoList.length})`;
  btnShowActive.textContent = `Active (${todoList.filter((item) => item.isCompleted === false).length})`;
  btnShowComplete.textContent = `Completed (${todoList.filter((item) => item.isCompleted === true).length})`;
};

const taskVisible = (event) => {
  if(event.target === todoShow.childNodes[1]){
    tab = 'all';
  } else if (event.target === todoShow.childNodes[3]){
    tab = 'active';
  } else if  (event.target === todoShow.childNodes[5]){
    tab = 'completed';
  }
  taskRender()
};
  
let getList = () => {
  switch(tab){
  case 'all':
    return todoList;
  case 'active':
    return todoList.filter((item)=> !item.isCompleted);
  case 'completed':
    
    return todoList.filter((item)=> item.isCompleted);
  }
}

// Drawing a new task in the task list

let taskRender = () => {
  let taskHTML = " ";
  getList().forEach((item) => {
    taskHTML += `<li class="todo__task" data-id="${item.id}">
            <label class="todo__checkbox"> 
                <input data-active="checkbox" type="checkbox" class="checkbox"
                ${item.isCompleted ? "checked" : ""} >
            </label >
            <input value="${item.text}" type="text" class='editText' hidden>
            <div class="todo__task-title">${item.text}</div>
            <div class="todo__task-del" data-type = "todo_close">x</div>
         </li>`;
  });
  taskList.innerHTML = taskHTML;
  newInput.value = ""
  sumTodo()
};

// Add task by click

let addTask = () => {
  let newTodo = {
    id: Date.now(),
    text: newInput.value,
    isCompleted: false,
  };
  todoList.push(newTodo);
  taskRender();
};

// Add task by Enter

let addByEnter = (event) => {
  if (event.code === "Enter") {
    let newTodo = {
      id: Date.now(),
      text: newInput.value,
      isCompleted: false,
    };
    todoList.push(newTodo);
    taskRender();
  }
};

// Changing the state of each all todo and together

let checkAllTodo = (event) => {
  todoList.forEach((item) => item.isCompleted = event.target.checked);
  taskRender()
}

let checkDone = (event) => {
  const activeTaskId = event.target.closest(".todo__task").getAttribute("data-id");
  const taskClick = todoList.find((item) => item.id === Number(activeTaskId));
  taskClick.isCompleted = !taskClick.isCompleted;
  if(todoList.every((item) => item.isCompleted === true)){
    checkAll.checked = true;
  }else {
    checkAll.checked = false;
  }
  taskRender();
};

// Adding a delete button

let deleteTask = (event) => {
  const activeTaskId = event.target.closest(".todo__task").getAttribute('data-id');
  todoList = todoList.filter((item) => Number(activeTaskId) !== item.id)
  taskRender();
};

//Delete all completed tasks 

let delAll = () => {
  todoList = todoList.filter((item) => !item.isCompleted)
  taskRender();
};

// Processing status changes and task deletion by click

let switchClick = (event) => {
  const element = event.target.closest(".todo__task");
  const liLabel = element.childNodes[1];
  if (event.target === liLabel.childNodes[1]) {
    checkDone(event);
  } else if (event.target === element.childNodes[7]){
    deleteTask(event);
  }
};

// Editing a task

let switchDblClick = (event) => {
  const element = event.target.closest(".todo__task");
  element.childNodes[3].hidden = false;
  element.childNodes[5].hidden = true;
  element.childNodes[3].focus();
};

// Saving with enter and blur, undoing changes with escape

let pressKey = (event) => {
  const element = event.target.closest(".todo__task");
  if (event.target === element.childNodes[3]) {
    if (event.keyCode === 13) {
      const editTask = element.getAttribute("data-id");
      const editText = todoList.find((item) => item.id === Number(editTask));
      editText.text = element.childNodes[3].value;
      taskRender();
    } else if (event.keyCode === 27) {
      taskRender();
    }
  }
};

let blurOn = (event) => {
  const inputSave = event.target.closest(".todo__task").childNodes[3];
  if (event.target === inputSave) {
    const editTask = event.target.closest(".todo__task").getAttribute("data-id");
    const editText = todoList.find((item) => item.id === Number(editTask));
    editText.text = inputSave.value;
    taskRender();
  }
};
   
taskList.addEventListener("keydown", pressKey);
taskList.addEventListener("blur", blurOn, true);
taskList.addEventListener("click", switchClick);
taskList.addEventListener("dblclick", switchDblClick);
newInput.addEventListener("keydown", addByEnter);
btnAdd.addEventListener("click", addTask);
btnDelAll.addEventListener("click", delAll);
checkAll.addEventListener("click", checkAllTodo);
todoShow.addEventListener("click", taskVisible);
