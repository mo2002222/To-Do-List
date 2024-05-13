let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');
let DataArray ;



getDataFromLS();

if (localStorage.getItem('tasks')) {
    DataArray = JSON.parse(localStorage.getItem('tasks'));
}else{
    DataArray=[];
}
//add task
submit.onclick = function(){
    if (input.value !== '') {
        addTaskToArray(input.value);
        input.value = '';
    }
}
// delete button
tasksDiv.addEventListener("click",(e)=>{
    if (e.target.classList.contains('del')) {
        e.target.parentElement.remove();
        deleteTaskWithId(e.target.parentElement.getAttribute('data-id'));
    }
    if (e.target.classList.contains('task')) {
        toggleTaskWith(e.target.getAttribute('data-id'));
        e.target.classList.toggle('done');
    }
})




//add tasks to arry function
function addTaskToArray(inpvalue) {
    //task data
    const task = {
        id : Date.now(),
        titel : inpvalue,
        completed : false
    }
    DataArray.push(task);
    addElementsToPage(DataArray);
    addDataToLocalstorag(DataArray);
};


// add elements to page function
function addElementsToPage(dataArr){
    tasksDiv.innerHTML = '';
    dataArr.forEach((task) => {
        let div = document.createElement('div');
        div.className = 'task';
        if (task.completed) {
            div.className = 'task done';
        }
        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.titel));
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('Delete'));
        div.appendChild(span);
        tasksDiv.append(div);
    });
}
//add data to local storage
function addDataToLocalstorag(arryoftask){
    window.localStorage.setItem('tasks' , JSON.stringify(arryoftask));
}
function getDataFromLS(){
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPage(tasks);
    }
}
//delet item from localstorage
function deleteTaskWithId(datid){
    DataArray = DataArray.filter((task)=> task.id != datid);
    addDataToLocalstorag(DataArray);
    
};
function toggleTaskWith(dataid2){
    for(let i=0 ; i < DataArray.length ; i++){
        if (DataArray[i].id == dataid2) {
            DataArray[i].completed == false ? DataArray[i].completed == true: DataArray[1].completed ==false ;
        }
    }
    addDataToLocalstorag(DataArray);
}