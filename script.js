let tasksData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done')
const deleteBtb = document.querySelector("button")
let dragElement = null;
const columns = [todo, progress, done]


function addTask(title, desc, column){
    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `
    column.appendChild(div)

    div.addEventListener('drag', () => {
        dragElement = div
    })

    const deleteBtn = div.querySelector("button")

    deleteBtn.addEventListener('click', () => {
        div.remove()
        updateTaskCount()
        
    })

    return div

}

function updateTaskCount(){
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        tasksData[ col.id ] = Array.from(tasks).map( (t) => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })
            
        count.innerText = tasks.length
    })

    localStorage.setItem("tasks", JSON.stringify(tasksData))

}

if(localStorage.getItem("tasks")) {
    
    const data = JSON.parse(localStorage.getItem("tasks"))
    
    for (const col in data) {
        
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            
           addTask(task.title, task.desc, column)

        })   
        
    }
    updateTaskCount()
    
}


const tasks = document.querySelectorAll('.task');

tasks.forEach((task) => {
    task.addEventListener('drag', (e) => {
        dragElement = task

    })
})




function addDragsEventsOnColumn(column) {
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

        updateTaskCount()

    })

}

addDragsEventsOnColumn(todo)
addDragsEventsOnColumn(progress)
addDragsEventsOnColumn(done)


const toggelModalButton = document.querySelector("#toggle-modale")
const modalBg = document.querySelector(".modale .bg")
const modale = document.querySelector(".modale")
const addTaskButton = document.querySelector("#add-new-task-btn")

toggelModalButton.addEventListener('click', (e) => {
    modale.classList.toggle("active")

})

modalBg.addEventListener('click', (e) => {
    modale.classList.remove("active")

})

addTaskButton.addEventListener('click', (e) => {

    const taskTitle = document.querySelector("#task-input").value
    const taskDesc = document.querySelector("#task-desc").value

    addTask(taskTitle, taskDesc, todo)
    updateTaskCount() 
    modale.classList.remove("active")

    document.querySelector("#task-input").value = ""
    document.querySelector("#task-desc").value = ""

})








