let tasksData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done')
const deleteBtb = document.querySelector("button")
let dragElement = null;
const columns = [todo, progress, done]
let count = null;

if(localStorage.getItem("tasks")) {
    
    const data = JSON.parse(localStorage.getItem("tasks"))
    
    for (const col in data) {
        
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            
            const div = document.createElement("div")
            div.classList.add("task")

            div.setAttribute("draggable", "true")

            div.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.desc}</p>
            <button>Delete</button>
            `

            column.appendChild(div)

            div.addEventListener('drag', (e) => {
                dragElement = div
            })

        });

        const tasks = column.querySelectorAll(".task")
        const count = column.querySelector(".right")
        count.innerText = tasks.length
        
    }
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

        columns.forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        tasksData[ col.id ] = Array.from(tasks).map( (t) => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })
        
        localStorage.setItem("tasks", JSON.stringify(tasksData))
        
        console.log(tasksData);
        
        count.innerText = tasks.length;
        
    })

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
    todo.appendChild(div)



    div.addEventListener('drag', () => {
        dragElement = div
    })

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        tasksData[ col.id ] = Array.from(tasks).map( (t) => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })
        
        localStorage.setItem("tasks", JSON.stringify(tasksData))
        
        console.log(tasksData);
        
        count.innerText = tasks.length;
        
    })

    modale.classList.remove("active")

})








