//uncompleted tasks in tasks array
const itemsLeft = document.getElementById('items-left');
//function to get all uncompleted tasks in tasks array
function itemsLeftNumber(tasks){
     const n = tasks.reduce((prev , current)=>{
        if(current.completed === false){prev++};
        return prev;
     },0);
     itemsLeft.textContent = n;
}
//function to change status of the task if it is completed or not
const customCheckToggle = (ele , tasks)=>{
    ele.addEventListener('click',(e)=>{
        ele.classList.toggle('check');

        const i = tasks.findIndex(e => e.id == ele.parentElement.id );
        let y = tasks[i];
        y.completed = !y.completed;
        localStorage.setItem('tasks' , JSON.stringify(tasks));
        itemsLeftNumber(tasks);
    })
}
//function to remove task from local storage and UI
const removeTask = (tasks , id) => {
    const removedTask = document.getElementById(id);
    removedTask.remove();

    let x = tasks.findIndex(e => e.id == id);
    tasks.splice(x,1);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
    itemsLeftNumber(tasks);
}
//function to creat element of task and return it
const renderTask = (task , tasks)=>{
    //drag-drop zone 
    const drag = document.createElement('div');

    // container of the task
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('class','task');
    taskContainer.setAttribute('id',task.id);


    // check box of the task
    const check = document.createElement('div');
    const checkSpan = document.createElement('span');
    task.completed ? check.setAttribute('class','custom-check check') : check.setAttribute('class','custom-check');
    customCheckToggle(check , tasks);
    check.appendChild(checkSpan);

    //task text
    const taskText = document.createElement('span');
    taskText.innerHTML = task.task;

    // remove Btn
    const removeBtn = document.createElement('close');
    removeBtn.setAttribute('class','close');
    const removeBtnImg = document.createElement('img');
    removeBtnImg.setAttribute('src','images/icon-cross.svg');
    removeBtn.appendChild(removeBtnImg);
    removeBtn.addEventListener('click', ()=> removeTask(tasks,task.id.toString()));

    taskContainer.append(check,taskText,removeBtn);

    //apend the task to drag-drop zone
    drag.append(taskContainer);
    return drag;
}
//function to add task to local storage and render it in UI
export const addTask = (e ,tasks ,taskInput ,taskCheck ,tasksContainer)=>{
    if(e.key == 'Enter' && taskInput.value){
        //get task values
        const task = {
            task : taskInput.value,
            completed : taskCheck.classList[1] == 'check',
            id: Date.now()
        }
        //set task values to array of tasks the set it to local storage
        tasks.push(task);
        localStorage.setItem('tasks' , JSON.stringify(tasks));

        //reset task form
        taskInput.value = '';
        taskCheck.classList.remove('check');

        itemsLeftNumber(tasks);
        tasksContainer.appendChild(renderTask(task , tasks));
    }
}
export const updateUI = (tasks, tasksContainer)=>{
        const fragment = document.createDocumentFragment('div');
        tasks.forEach(t => {
            fragment.appendChild(renderTask(t,tasks));
        });
        tasksContainer.innerHTML = '';
        tasksContainer.appendChild(fragment);
        itemsLeftNumber(tasks);
}
