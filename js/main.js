import  {addTask , updateUI} from './tasks.js';
//task handler
const taskInput = document.querySelector('#task-input');
const taskCheck = document.querySelector('.custom-check');
const tasksContainer = document.querySelector('.tasks');
const customCheck = document.querySelectorAll('.task .custom-check');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// filter todo Btns
const allTasks = document.getElementById('all-tasks');
const completedTasks = document.getElementById('completed-tasks');
const activeTasks = document.getElementById('active-tasks');
const todoBtns = [allTasks , completedTasks , activeTasks];
//clear completed tasks
const clearCompleted = document.getElementById('clearAll');
// theme toggle function and variables
const toggleTheme = document.getElementById('toggle');
const toggleImg = document.getElementById('toggle-img');
const bgImg = document.getElementById('bg-img')
toggleTheme.addEventListener('click',()=>{
    toggleImg.src =  document.body.classList[0] !== 'light' ? 'images/icon-moon.svg' : 'images/icon-sun.svg';
    document.body.classList.toggle('light');
    bgImg.src = document.body.classList[0] !== 'light' ?   'images/bg-desktop-dark.jpg' :'images/bg-desktop-light.jpg';

})

//toggle check class for all custom check Btns
taskCheck.addEventListener('click',()=> taskCheck.classList.toggle('check'));
//change the stutus of the task to be completed or not when clicking on custom check Btn
customCheck.forEach(ele=>{
    customCheckToggle(ele , tasks);
})
// add task
taskInput.addEventListener('keydown',(e)=> addTask(e ,tasks ,taskInput ,taskCheck ,tasksContainer));
//render all tasks in dom
updateUI(tasks ,tasksContainer);

//todo Btns functions
//filter completed tasks only
function filterCompledted(tasks){
    const completed = tasks.filter(t=> t.completed === true);
    tasksContainer.innerHTML = '';
    updateUI(completed , tasksContainer);
}
//filter not completed tasks only
function filterNotCompledted(tasks){
    const completed = tasks.filter(t=> t.completed !== true);
    tasksContainer.innerHTML = '';
    updateUI(completed , tasksContainer);
}
allTasks.addEventListener('click',()=>{
    updateUI(tasks , tasksContainer);
    todoBtns.forEach(B=> B.classList.remove('active'));
    allTasks.classList.add('active');
});
completedTasks.addEventListener('click',()=>{
    filterCompledted(tasks);
    todoBtns.forEach(B=> B.classList.remove('active'));
    completedTasks.classList.add('active');
});
activeTasks.addEventListener('click',()=>{
    filterNotCompledted(tasks);
    todoBtns.forEach(B=> B.classList.remove('active'));
    activeTasks.classList.add('active');
});

//clear completed tasks
clearCompleted.addEventListener('click',()=>{
    let completedTasks = tasks.filter(t=> t.completed != true);
    tasks = completedTasks;
    localStorage.setItem('tasks' , JSON.stringify(tasks));
    updateUI(tasks ,tasksContainer);
})
