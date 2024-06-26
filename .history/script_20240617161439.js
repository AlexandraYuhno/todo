const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const taskList =document.getElementById('taskList');

let todoList = [];

//Track click button 'Add'


let render = () => { 
    const taskText = newInput.value 
    let taskHTML = ""

    todoList.forEach(() => {
        taskHTML += ` <li class="todo__task">
                        <label class="todo__checkbox"> 
                             <input type="checkbox">
                        </label>
                        <div class="todo__task-title"> ${taskText}</div>
                     </li>`   ;
    
    text.innerHTML = taskHTML;  }
)
}

btnAdd.addEventListener("click", function addTask(){
    let newTodo = {
        text: newInput.value,
        isCompleted:false,
        };
    todoList.push(newTodo);
    
    render();
});


