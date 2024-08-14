
(() => {
  const newInput = document.getElementById('newInput');
  const btnAdd = document.getElementById('btnAdd');
  const taskList = document.getElementById('taskList');
  const btnDelAll = document.getElementById('btnDelAll');
  const checkAll = document.getElementById('checkAll');
  const todoShow = document.getElementById('todoShow');
  const todoPaganation = document.getElementById('todoPaganation');
  
  let tab = 'all';
  const ITEMS_PAGE = 5;
  let current_page = 1; 
  const TAB_ENTER = 13;
  const URL = 'http://localhost:3001/tasks';
  
  let todoList = [];
  
  function alertError(error) {
    alert(error.message);
  }

  const getAllTodo = () => { 
    fetch(URL, { method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      todoList = data
      taskRender()
    })
    .catch((error) => alertError(error))
  }
  
  const createTask = (data) => { 
    fetch(URL, { method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then(result => {
      todoList.push(result);
      activePage();
      taskRender();
    })
    .catch((error) => alertError(error))
  };
  
  const deleteCompletedTasks = async () => {
     await fetch(`${URL}/completed`, {
      method: 'DELETE',
    })
    .then(() => {
      todoList = todoList.filter((item) => !item.isCompleted)
      switchFilterBtn();
      taskRender();
    })
    .catch((error) => alertError(error))
  };
  
  const deleteTaskId = async (id) => {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      todoList = todoList.filter((item) => Number(id) !== item.id);
      activePage();
      switchFilterBtn();
      taskRender();
    })
    .catch((error) => alertError(error))
  };

  const updateTask = async (item) => {
    await fetch(`${URL}/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then(res => {
    todoList = todoList.map((item) => {
     return item.id === res.id ? res : item;
    });
  })   
  .catch((error) => alertError(error))
  }

  const checkAllTasks = async (event) => {
    if(todoList.length !== 0){
      await fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
      todoList.forEach((item) => item.isCompleted = event.target.checked);
      switchFilterBtn(); 
      taskRender();
      })
      .catch((error) => alertError(error))
    }
  }
  
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
    if(countTodoActive === 0 || countTodoCompleted === 0){
    tab = 'all'
  } 
    taskRender()
  };
  
  const getList = () => {
    switch (tab) {
      case 'all':
      return todoList;
      case 'active':
      return todoList.filter((item) => !item.isCompleted);
      case 'completed':
      return todoList.filter((item) => item.isCompleted);
    }
  };
  
  const btnFilterRender = () => {
    todoShow.innerHTML = `<button class='todo__show_all ${'all' === tab ? 'active' : ''}
    btn btn-danger-border-subtle' id='btnShowAll' data-id ='all'>All (0)</button>
    <button class='todo__show_active ${'active' === tab ? 'active' : ''}
    btn btn-danger-border-subtle' id='btnShowActive' data-id ='active'>Active (0)</button>
    <button class='todo__show_complete ${ 'completed' === tab ? 'active' : ''} 
    btn btn-danger-border-subtle' id='btnShowComplete' data-id ='completed'>Completed (0)</button>`;
  };
  
  const showPage = (newTodoList) => {
    const itemsStart = (current_page - 1) * ITEMS_PAGE;
    const itemsEnd = itemsStart + ITEMS_PAGE;
    const pagTodoList = newTodoList.slice(itemsStart, itemsEnd); 
    return pagTodoList;
  };
  
  const crossPage = (event) => {
    const element = event.target;
    if(element.id === 'pagination_btn'){
      let page = element.getAttribute('data-page');
      current_page = Number(page);
    };
    taskRender();
  };
  
  const pagRender = (newTodoList) => {
    let addPageHTML = '';
    const pagesTotal = Math.ceil(newTodoList.length / ITEMS_PAGE);
    for (let i = 0; i < pagesTotal; i++) {
      addPageHTML += `<button id='pagination_btn' class='todo__pagination_btn 
      ${current_page === i+1 ? 'active' : ''}' data-page='${i+1}'>${i+1}</button>`;
    }
    todoPaganation.innerHTML = addPageHTML;
  };
  
  const activePage = () => {
    const pagesTotal = Math.ceil(todoList.length / ITEMS_PAGE);
    current_page = pagesTotal;
  };
  
  const taskRender = () => {
    let newTodoList = getList();
    let pagTodoList = showPage(newTodoList);
    let taskHTML = '';
    pagTodoList.forEach((item) => {
    taskHTML += `<li class='todo__task list-group-item list-group-item-info
      form-check text-break' data-id='${item.id}'>
      <label class='todo__checkbox form-check-label'> 
      <input data-active='checkbox' type='checkbox' class='checkbox form-check-input'
      ${item.isCompleted ? 'checked' : '' }>
      </label >
      <input value='${item.text}' class='editText' hidden maxlength='255'>
      <div class='todo__task-title'>${item.text}</div>
      <div class='todo__task-del btn-close'></div>
      </li>`;
    });
    taskList.innerHTML = taskHTML;
    newInput.value = '';
    changeAllCheck();
    checkAllNoActive();
    btnFilterRender();
    sumTodo();
    pagRender(newTodoList);
  };
  
  const addTask = () => {
    const text = validation(newInput.value)
    if(text){
      let newTodo = {
      text: text,
      isCompleted: false,
    }; 
    tab = 'all';
    createTask(newTodo);
    }
  };
  
  const validation = (value) => {
    const validationValue = value.trim()
    if(validationValue.length !== 0){
      const str = validationValue.replace(/ {2,}/g, ' ');
      return _.escape(str);
    }
  };
  
  const addByEnter = (event) => {
    if (event.keyCode === TAB_ENTER) {
    addTask();
    }
  };
  
  const checkAllNoActive = () => {
    todoList.length === 0 ? checkAll.disabled : !checkAll.disabled;
  };
  
  const checkDone = async (event) => {
    const activeTaskId = event.target.closest('.todo__task').getAttribute('data-id');
    const taskClick = todoList.find((item) => item.id === Number(activeTaskId));
    taskClick.isCompleted = !taskClick.isCompleted;
    await updateTask(taskClick)
    switchFilterBtn();
    taskRender();
  };
  
  const changeAllCheck = () => {
    checkAll.checked = todoList.length && todoList.every((item) => item.isCompleted); 
  };
  
  const deleteTask = (event) => {
    const activeTaskId = event.target.closest('.todo__task').getAttribute('data-id');
    deleteTaskId(activeTaskId)
  };
  
  const switchClick = (event) => {
    const element = event.target.closest('.todo__task');
    const liLabel = element.childNodes[1];
    if (event.target === liLabel.childNodes[1]) {
      checkDone(event);
    } else if (event.target === element.childNodes[7]){
      deleteTask(event); 
    }
  };
  
  const switchDblClick = (event) => {
    const element = event.target.closest('.todo__task');
    element.childNodes[3].hidden = false;
    element.childNodes[5].hidden = true;
    element.childNodes[3].focus();
  };
  
  const pressKey = async (event) => {
    const element = event.target.closest('.todo__task');
    const elementContent = element.childNodes[3];
      if (event.target === elementContent) {
        if (event.keyCode === TAB_ENTER) {
          const todoId = element.getAttribute('data-id');
          const todoItem = todoList.find((item) => item.id === Number(todoId));
          const text = validation(elementContent.value)
          if(text && todoItem.text !== text){            
            console.log(todoItem.text, text )
            todoItem.text = text;
            await updateTask(todoItem)
            taskRender();
          } else {
            elementContent.value = todoItem.text;
            taskRender();
          }
        } else if (event.keyCode === 27) {
          const todoId = element.getAttribute('data-id');
          const todoItem = todoList.find((item) => item.id === Number(todoId));
          elementContent.value = todoItem.text;
          await updateTask(todoItem)
          taskRender();
        }
      }
  };
  
  const blurOn = async (event) => {
    const inputSave = event.target.closest('.todo__task').childNodes[3];
    if(!inputSave.value){
      taskRender()
    } else if (event.target === inputSave && event.sourceCapabilities) {
      const todoId = event.target.closest('.todo__task').getAttribute('data-id');
      const todoItem = todoList.find((item) => item.id === Number(todoId));
      const text = validation(inputSave.value)
      if(text && todoItem.text !== text){
        todoItem.text = text;
        await updateTask(todoItem)
        taskRender();
      } else {
        inputSave.value = todoItem.text;
        taskRender();
      }
    }
  };
  
  taskList.addEventListener('keydown', pressKey);
  taskList.addEventListener('blur', blurOn, true);
  taskList.addEventListener('click', switchClick);
  taskList.addEventListener('dblclick', switchDblClick);
  newInput.addEventListener('keydown', addByEnter);
  btnAdd.addEventListener('click', addTask);
  btnDelAll.addEventListener('click', deleteCompletedTasks);
  checkAll.addEventListener('click', checkAllTasks);
  todoShow.addEventListener('click', taskVisible);
  todoPaganation.addEventListener('click', crossPage);
  window.addEventListener('load', getAllTodo)

})();


