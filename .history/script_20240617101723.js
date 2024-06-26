const dom ={
    new : document.getElementById('new'),
    add : document.getElementById('add')
}

dom.add.onclick=()=>{
    const task = dom.new.value
    if(task){
        addTask(task)
    }
}