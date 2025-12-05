const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done')
let dragElement = null;
let count = null;


const tasks = document.querySelectorAll('.task');

tasks.forEach(  (task) => {
    task.addEventListener('drag', (e) => {
        dragElement = task
       
    })
})  




function addDragsEventsOnColumn(column){
    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add('hover-over');
    })
    column.addEventListener('dragleave', (e) => {
        e.preventDefault();
        column.classList.remove('hover-over');
    })

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.appendChild(dragElement)
        column.classList.remove('hover-over')
        
    })
}

const board = document.querySelectorAll('.board')

// addDragsEventsOnColumn(todo)
// addDragsEventsOnColumn(progress)
// addDragsEventsOnColumn(done)

board.forEach( (e) => {
    const columns = e.querySelectorAll('.task-column');

    columns.forEach( (e) => {
        addDragsEventsOnColumn(e);
    })

})

const toggelModalButton = document.querySelector("#toggle-modale")
const modalBg = document.querySelector(".modale .bg")
const addTaskButton= document.querySelector(".add-task-btn")
const modale= document.querySelector(".modale")

toggelModalButton.addEventListener('click', (e) => {
    modale.classList.toggle("active")
    
})

modalBg.addEventListener('click', (e) => {
    modale.classList.remove("active")
    
})

addTaskButton.addEventListener('click', (e) => {
        
    const taskInput = document.querySelector("#task-input")
    const taskDetails = document.querySelector("#task-detail")



    document.querySelector("#task-title").innerHTML = taskInput.value
    document.querySelector("#task-desc").innerHTML = taskDetails.value
    
    


    modale.classList.remove("active")
    
})


