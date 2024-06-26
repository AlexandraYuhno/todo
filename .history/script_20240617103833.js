const dom ={
    new : document.getElementById('new'),
    add : document.getElementById('add')
}

//Track click button 'Add'

dom.add.onclick=()=>{
    const task = dom.new.value
    if(task){
        addTask(task)
    }
}

function addTask(){
    alert("ok")
}