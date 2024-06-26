const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const task = document.getElementById('task')
const taskList =document.getElementById('taskList')

let todoList = []

//Track click button 'Add'


render = () => {

   const taskText = newInput.value 
   todoList.forEach((taskHTML) => {
    const taskHTML = ` <li class="todo__task" id="task">
              <label class="todo__checkbox"> 
                <input type="checkbox">
                </label>
             <div class="todo__task-title"> ${taskText}</div>
            </li>`   })
 taskList.innerHTML = taskHTML

}

btnAdd.addEventListener("click", addTask(){
    let newTodo ={
        text,
        checked:false
        isCompleted:false
        };
        todoList push(newTodo)
console.log("1")

        render()
})


