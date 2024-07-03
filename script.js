(() => {

  const newInput = document.getElementById("newInput");
  const btnAdd = document.getElementById("btnAdd");
  const taskList = document.getElementById("taskList");
  const btnDelAll = document.getElementById("btnDelAll");
  const checkAll = document.getElementById('checkAll');
  const todoShow = document.getElementById('todoShow');
  const todoPaganation = document.getElementById('todoPaganation');

  let tab = 'all';
  const items_page = 5;
  let current_page = 1; 
  const tab_enter = 13;

  // Displaying the added task in the task list

  let todoList = [];

  //Filtering tasks

  const sumTodo = () => {
    const countTodo = todoList.length;
    const countTodoActive = todoList.filter((item) => !item.isCompleted).length
    todoShow.childNodes[0].textContent = `All (${countTodo})`;
    todoShow.childNodes[2].textContent = `Active (${countTodoActive})`;
    todoShow.childNodes[4].textContent = `Completed (${countTodo - countTodoActive})`;
  };

  const taskVisible = (event) => {
    tab = event.target.getAttribute('data-id');
    current_page = 1
    taskRender()
  };

  const switchFilterBtn = () => {
    const countTodoActive = todoList.filter((item) => !item.isCompleted).length;
    const countTodoCompleted = todoList.length - countTodoActive;
    if(countTodoActive === 0){
      tab = "all"
    } else if(countTodoCompleted === 0){
      tab = "all"
    }
    taskRender()
  };

  const getList = () => {
    switch (tab) {
    case "all":
      return todoList;
    case "active":
      return todoList.filter((item) => !item.isCompleted);
    case "completed":
      return todoList.filter((item) => item.isCompleted);
    }
  };

  const btnFilterRender = () => {
    todoShow.innerHTML = `<button class="todo__show_all ${"all" === tab ? "active" : ""} btn btn-danger-border-subtle" id="btnShowAll" data-id ="all">All (0)</button>
   <button class="todo__show_active ${"active" === tab ? "active" : ""} btn btn-danger-border-subtle" id="btnShowActive" data-id ="active">Active (0)</button>
   <button class="todo__show_complete ${ "completed" === tab ? "active" : ""} btn btn-danger-border-subtle" id="btnShowComplete" data-id ="completed">Completed (0)</button>`;
  };
 
  //Pagination task
 
  const showPage = (newTodoList) => {
    const itemsStart = (current_page - 1) * items_page;
    const itemsEnd = itemsStart + items_page;
    const pagTodoList = newTodoList.slice(itemsStart, itemsEnd); 
    return pagTodoList;
  };
 
  const crossPage = (event) => {
    let page = event.target.getAttribute("data-page");
    current_page = Number(page);
    taskRender()
  };
 
  const pagRender = () => {
    let addPageHTML = '';
    const pagesTotal = Math.ceil(todoList.length / items_page);
    for (let i = 0; i < pagesTotal; i++) {
      addPageHTML += `<button class="todo__pagination_btn ${current_page === i+1 ? 
        "active" : ""}" data-page="${i+1}">${i+1}</button>`;
    }
    todoPaganation.innerHTML = addPageHTML;
  };

  const activePage = () => {
    const pagesTotal = Math.ceil(todoList.length / items_page);
    current_page = pagesTotal;
  };

  // Drawing a new task in the task list
 
  const taskRender = () => {
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

  const addTask = () => {
    let newTodo = {
      id: Date.now(),
      text: newInput.value,
      isCompleted: false,
    };  
    tab = "all";
    todoList.push(newTodo);
    changeAllCheck()
    activePage()
    taskRender();
  };
 
  const validation = () => {

    if(newInput.value.trim()){
      newInput.value = newInput.value.replace("<", "&#60;").replace(">", "&#62;").replace("№", "&#8470").replace("%", "&#37").replace(":", "&#58").replace("?", "&#63").replace("*", "&#42").replace(/ {2,}/g, " ").replace("/", "&#47");
      addTask()
    };
    // newInput.value = newInput.value.escape(newInput.value)
  };

  // Add task by Enter 

  const addByEnter = (event) => {
    if (event.keyCode === tab_enter) {
      validation();
    }
  };

  // Changing the state of each all todo and together

  const checkAllTodo = (event) => {
    todoList.forEach((item) => item.isCompleted = event.target.checked);
    switchFilterBtn(); 
    taskRender();
  };

  const checkDone = (event) => {
    const activeTaskId = event.target.closest(".todo__task").getAttribute("data-id");
    const taskClick = todoList.find((item) => item.id === Number(activeTaskId));
    taskClick.isCompleted = !taskClick.isCompleted;
    switchFilterBtn();
    changeAllCheck();
    taskRender();
  };

  const changeAllCheck = () => {
    checkAll.checked = todoList.length && todoList.every((item) => item.isCompleted); 
  };
  // Adding a delete button

  const deleteTask = (event) => {
    const activeTaskId = event.target.closest(".todo__task").getAttribute('data-id');
    todoList = todoList.filter((item) => Number(activeTaskId) !== item.id);
    activePage();
    changeAllCheck();
    switchFilterBtn();
    taskRender();
  };

  //Delete all completed tasks 

  const delAll = () => {
    todoList = todoList.filter((item) => !item.isCompleted)
    changeAllCheck();
    switchFilterBtn();
    taskRender();
  };

  // Processing status changes and task deletion by click

  const switchClick = (event) => {
    const element = event.target.closest(".todo__task");
    const liLabel = element.childNodes[1];
    if (event.target === liLabel.childNodes[1]) {
      checkDone(event);
    } else if (event.target === element.childNodes[7]){
      deleteTask(event); 
    }
  };

  // Editing a task

  const switchDblClick = (event) => {
    const element = event.target.closest(".todo__task");
    element.childNodes[3].hidden = false;
    element.childNodes[5].hidden = true;
    element.childNodes[3].focus();
  };

  // Saving with enter and blur, undoing changes with escape  

  const pressKey = (event) => {
    const element = event.target.closest(".todo__task");
    const elementContent = element.childNodes[3];
    if (event.target === elementContent) {
      if (event.keyCode === tab_enter) {
        const editTask = element.getAttribute("data-id");
        const editText = todoList.find((item) => item.id === Number(editTask));
        if(elementContent.value.trim()){
          elementContent.value = elementContent.value.replace(/ {2,}/g, " ");
          editText.text = _.escape(elementContent.value);
          taskRender();
        };
      } else if (event.keyCode === 27) {
        const editTask = element.getAttribute("data-id");
        const editText = todoList.find((item) => item.id === Number(editTask));
        elementContent.value = editText.text;
        taskRender();
      }
    }
  };

  const blurOn = (event) => {
    const inputSave = event.target.closest(".todo__task").childNodes[3];
    if (event.target === inputSave) {
      const editTask = event.target.closest(".todo__task").getAttribute("data-id");
      const editText = todoList.find((item) => item.id === Number(editTask));
      if(inputSave.value.trim()){
        inputSave.value = inputSave.value.replace(/ {2,}/g, " ");
        editText.text = _.escape(inputSave.value);
        taskRender();
      }
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
})();