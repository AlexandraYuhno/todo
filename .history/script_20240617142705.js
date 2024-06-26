const newInput = document.getElementById('newInput');
const btnAdd = document.getElementById('btnAdd');
const task = document.getElementById('task')
const taskList =document.getElementById('taskList')

let todoList = []

//Track click button 'Add'


render = () => {
   const taskText = newInput.value 
   todoList.forEach(i, taskHTML){
 
 let taskHTML = ` <li class="todo__task" id="task">
              <label class="todo__checkbox"> 
                <input type="checkbox">
                </label>
             <div class="todo__task-title"> ${taskText}</div>
            </li>`   }
 taskList.insertAdjacentHTML("beforeend", taskHTML)
}

btnAdd.addEventListener("click", addTask(){
    let newTodo ={
        text,
        checked:false
        isCompleted:false
        };
        todoList push(newTodo)


        renderTask(),
})









/*btnAdd.addEventListener("enter", addTask(){
let newTodo{
text
checked:false
isCompleted:false
};
todoList push(newTodo)
})*/


/*function addTask(text){
    const timestamp = Date.now()
    const task = {
        id: timestamp,
        text,
        isComlete:false,
    }
    tasks push(task)
    console.log(tasks)
}*/
            
/*const newTask = document.createElement("div") 
    newTask.innerHTML = newInput.value;
    div.appendChild(newTask)*/


    {todo}