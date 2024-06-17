const dom ={
    new : document.getElementById('new'),
    add : document.getElementById('add')
}

//Track click button 'Add'

dom.add.onclick=()=>{
        addTask()
}

function addTask(){
    alert("ok")
}