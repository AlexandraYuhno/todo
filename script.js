(function appTodo(){

  const newInput = document.getElementById("newInput");
  const btnAdd = document.getElementById("btnAdd");
  const taskList = document.getElementById("taskList");
  const btnDelAll = document.getElementById("btnDelAll");
  const checkAll = document.getElementById('checkAll');
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

  //Filtering tasks

  let sumTodo = () => {
    let countTodo = todoList.length;
    let countTodoActive = todoList.filter((item) => item.isCompleted === false).length
    todoShow.childNodes[0].textContent = `All (${countTodo})`;
    todoShow.childNodes[2].textContent = `Active (${countTodoActive})`;
    todoShow.childNodes[4].textContent = `Completed (${countTodo - countTodoActive})`;
  };

  const taskVisible = (event) => {
    tab = event.target.getAttribute('data-id');
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

  let btnFilterRender = () => {
    todoShow.innerHTML = `<button class="todo__show_all ${"all" === tab ? "active" : ""} btn btn-danger-border-subtle" id="btnShowAll" data-id ="all">All (0)</button>
   <button class="todo__show_active ${"active" === tab ? "active" : ""} btn btn-danger-border-subtle" id="btnShowActive" data-id ="active">Active (0)</button>
   <button class="todo__show_complete ${ "completed" === tab ? "active" : ""} btn btn-danger-border-subtle" id="btnShowComplete" data-id ="completed">Completed (0)</button>`;
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
    let addPageHTML = '';
    const pagesTotal = Math.ceil(todoList.length / itemsPerPage);
    for (let i = 0; i < pagesTotal; i++) {
      addPageHTML += `<button class="todo__pagination_btn ${currentPage === i+1 ? 
        "active" : ""}" data-page="${i+1}">${i+1}</button>`;
    }
    todoPaganation.innerHTML = addPageHTML;
  };

  let activePage = () => {
    const pagesTotal = Math.ceil(todoList.length / itemsPerPage);
    currentPage = pagesTotal;
  };

  // Drawing a new task in the task list
 
  let taskRender = () => {
    let newTodoList = getList();
    let pagTodoList = showPage(newTodoList);
    let taskHTML = " ";
    pagTodoList.forEach((item) => {
      taskHTML += `<li class="todo__task list-group-item list-group-item-info form-check text-break" data-id="${item.id}">
        <label class="todo__checkbox form-check-label"> 
          <input data-active="checkbox" type="checkbox" class="checkbox form-check-input"
          ${item.isCompleted ? "checked" : "" }>
        </label >
        <input value="${item.text}" class='editText' hidden maxlength="255">
        <div class="todo__task-title">${item.text}</div>
        <div class="todo__task-del btn-close"></div>
      </li>`;
    });
    taskList.innerHTML = taskHTML;
    newInput.value = "";
    btnFilterRender()
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
    changeAllCheck()
    activePage()
    taskRender();
  };
 
  let validation = () => {
    if(newInput.value.trim()){
      newInput.value = newInput.value.replace("<", "\≺").replace(">", "\≻").replace("№", "\№").replace("%", "\%").replace(":", "\:").replace("?", "\?").replace("*", "\*")
      addTask()
      console.log.apply(newInput.value)
    };
  };

  // Add task by Enter "№%:?*

  let addByEnter = (event) => {
    if (event.keyCode === 13) {
      validation();
    }
  };

  // Changing the state of each all todo and together

  let checkAllTodo = (event) => {
    todoList.forEach((item) => item.isCompleted = event.target.checked);
    taskRender()
  };

  let checkDone = (event) => {
    const activeTaskId = event.target.closest(".todo__task").getAttribute("data-id");
    const taskClick = todoList.find((item) => item.id === Number(activeTaskId));
    taskClick.isCompleted = !taskClick.isCompleted;
    changeAllCheck()
    taskRender();
  };

  let changeAllCheck = () => {
    checkAll.checked = todoList.length && todoList.every((item) => item.isCompleted); 
  };
  // Adding a delete button

  let deleteTask = (event) => {
    const activeTaskId = event.target.closest(".todo__task").getAttribute('data-id');
    todoList = todoList.filter((item) => Number(activeTaskId) !== item.id);
    activePage();
    taskRender();
    changeAllCheck();
  };

  //Delete all completed tasks 

  let delAll = () => {
    todoList = todoList.filter((item) => !item.isCompleted)
    taskRender();
    changeAllCheck();
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

  taskRender()

  taskList.addEventListener("keydown", pressKey);
  taskList.addEventListener("blur", blurOn, true);
  taskList.addEventListener("click", switchClick);
  taskList.addEventListener("dblclick", switchDblClick);
  newInput.addEventListener("keydown", addByEnter);
  btnAdd.addEventListener("click", validation);
  btnDelAll.addEventListener("click", delAll);
  checkAll.addEventListener("click", checkAllTodo);
  todoShow.addEventListener("click", taskVisible);
  todoPaganation.addEventListener("click", crossPage);
}());