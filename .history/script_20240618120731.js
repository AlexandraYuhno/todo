const newInput = document.getElementById('newInput');  //поле ввода
const btnAdd = document.getElementById('btnAdd'); //кнопка добавить
const taskList = document.getElementById('taskList'); //список задач ul

let todoList = [];


// Displaying the added task in the task list

function taskRender(){ 
    
    let taskHTML =""
    todoList.forEach(function(item){
      taskHTML += ` <li class="todo__task">
                        <label class="todo__checkbox" for = "item_${item.id}" checked = ${item.isCompleted}> 
                             <input type="checkbox" id= "item_${item.id}">
                        </label>
                        <div class="todo__task-title"> ${item.text}</div>
                     </li>`   ;
        taskList.innerHTML = taskHTML;
    }
)}

//Changing the state of a task

/*newTodo.isCompleted ? 'checked' : ''; */

function checkCheckbox(item) {
    const checkbox = todoList.find(item.isCompleted, item.id);
    if (checkbox.checked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is not checked');
    }
  }

//Track click button 'Add'
btnAdd.addEventListener("click", function addTask(){
   
    let newTodo = {
        text: newInput.value,
        isCompleted:false,
        id:Date.now()
        };
    todoList.push(newTodo);
    taskRender()
    checkCheckbox()
});
  

  

/*id= "item_${item.id}"*/