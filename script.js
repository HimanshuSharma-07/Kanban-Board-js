const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done')
let dragElement = null;
let count = updateCounts();


const tasks = document.querySelectorAll('.task');

tasks.forEach((task) => {
    task.addEventListener('drag', (e) => {
        dragElement = task

    })
})

function updateCounts() {
    const colums = [todo, progress, done]
    colums.forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        count.innerText = tasks.length;
        console.log(count.innerText = tasks.length);

    })
}


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

        updateCounts()

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

    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button>Delete</button>
    `
    div.addEventListener('drag', () => {
        dragElement = div
    })

    todo.appendChild(div)
    updateCounts()

    modale.classList.remove("active")

})






