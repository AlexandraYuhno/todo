(function appTodo(){

  const newInput = document.getElementById("newInput");
  const btnAdd = document.getElementById("btnAdd");
  const taskList = document.getElementById("taskList");
  const btnDelAll = document.getElementById("btnDelAll");
  const checkAll = document.getElementById('checkAll');
  const btnShowActive = document.getElementById('btnShowActive');
  const btnShowAll = document.getElementById('btnShowAll');
  const btnShowComplete = document.getElementById('btnShowComplete');
  const todoShow = document.getElementById('todoShow');
  const todoPaganation = document.getElementById('todoPaganation');

  let tab = 'all'
  const itemsPerPage = 5;
  let currentPage = 1; 

  // Displaying the added task in the task list

  let todoList = [
    { id: Date.now(), text: "Задача 1", isCompleted: true },
    { id: Date.now() + 3, text: "Задача 2", isCompleted: false },
  ];

  let sumTodo = () =>{
    let countTodo = todoList.length;
    let countTodoActive = todoList.filter((item) => item.isCompleted === false).length
    btnShowAll.textContent = `All (${countTodo})`;
    btnShowActive.textContent = `Active (${countTodoActive})`;
    btnShowComplete.textContent = `Completed (${countTodo - countTodoActive})`;
  };

  const taskVisible = (event) => {
    tab = event.target.getAttribute('data-id');
    console.log(event.target)
    // if (event.target.getAttribute('data-id') === tab) {
    //   event.target.classList.add('active');
    // } else {
    //   event.target.classList.remove('active');
    // };
    taskRender()
  };
  
  let getList = () => {
    switch (tab) {
    case "all":
      return todoList;
    case "active":
      return todoList.filter((item) => !item.isCompleted);
    case "completed":
      return todoList.filter((item) => item.isCompleted);
    }
  };
  
  //Pagination task
  
  let showPage = (newTodoList) => {
    const itemsStart = (currentPage - 1) * itemsPerPage;
    const itemsEnd = itemsStart + itemsPerPage;
    const pagTodoList = newTodoList.slice(itemsStart, itemsEnd); 
    return pagTodoList;
  };
  
  let crossPage = (event) => {
    let page = event.target.getAttribute("data-page");
    currentPage = Number(page);
    taskRender()
  };
  
  let pagRender = () => {
    let addPageHTML =''
    const pagesTotal = Math.ceil(todoList.length / itemsPerPage);

    // if (pagesTotal < 1) {
    //   currentPage = 1;
    // } else if (currentPage > pagesTotal) {
    //   currentPage = pagesTotal;
    // }

    for (let i = 0; i < pagesTotal; i++) {
      addPageHTML += `<button class="todo__pagination_btn ${currentPage === i+1 ? 
        "active" : ""}" data-page="${i+1}">${i+1}</button>`;
    }
    todoPaganation.innerHTML = addPageHTML;
  }

  // Drawing a new task in the task list
  
  let taskRender = () => {
    let newTodoList = getList();
    let pagTodoList = showPage(newTodoList);
    let taskHTML = " ";
    pagTodoList.forEach((item) => {
      taskHTML += `<li class="todo__task" data-id="${item.id}">
      <label class="todo__checkbox"> 
        <input data-active="checkbox" type="checkbox" class="checkbox"
        ${item.isCompleted ? "checked" : ""} maxlength="255">
      </label >
      <input value="${item.text}" class='editText' hidden>
      <div class="todo__task-title">${item.text}</div>
      <div class="todo__task-del">x</div>
      </li>`;
    });
    taskList.innerHTML = taskHTML;
    newInput.value = "";
    sumTodo();
    pagRender();
    showPage(newTodoList);
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
  }
  
  // let validation = () => {
  //   if(newInput.value.trim()){
  //     addTask()
  //   }
  //   const maxLength = 10;
  //   if (this.value.length > maxLength) {
  //     this.value = this.value.substring(0, maxLength); // Обрезаем слишком длинный текст!
  //   }
  // }

  // Add task by Enter

  let addByEnter = (event) => {
    if (event.keyCode === 13) {
      addTask()
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
    todoList.every((item) => item.isCompleted ? checkAll.checked = true : checkAll.checked = false)  
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
  todoPaganation.addEventListener("click", crossPage);
}());