// Task 7: Create Html 
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
    <li class="list-group-item card m-1" id="task" draggable="true" ondragstart="drag(event)" data-task-id=${id}>
        <div class="d-flex mt-2 justify-content-between align-items-center">
            <small style="font-size:16px; font-weight: 600;">${name}</small>
            <span class="badge ${status === 'To-do' ? 'badge-danger' : 'badge-success'} ${status === 'In Progress' ? 'badge-info' : 'badge-success'} ${status === 'Review' ? 'badge-warning' : 'badge-success'}" style="border: 1px solid var(--light); color: var(--light);">${status}</span>
        </div>
        <div class="d-flex mb-4 justify-content-between">
            <small>${assignedTo}</small>
            <small>${dueDate}</small>
        </div>
        <small>${description}</small>
        <div class="d-flex justify-content-end">
        <button class="btn btn-outline-success done-button mr-1 ${status === 'Done' ? 'invisible' : 'visible'}">Mark as Done</button>
        <button class="btn btn-outline-danger delete-button">Delete</button>
        </div>
    </li>
`;

// Task 6: Create the TaskManager class
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }


    addTask(name, description, assignedTo, dueDate, status) {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        };

        this.tasks.push(task);
    }

    // Task 10: Delete Tasks
    deleteTask(taskId) {
        const newTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];

            if (task.id !== taskId) {

                newTasks.push(task);
            }
        }

        // Set this.tasks to newTasks
        this.tasks = newTasks;
    }

    // Task 8: Status 
    getTaskById(taskId) {
        let foundTask;

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];

            if (task.id === taskId) {
                foundTask = task;
            }
        }

        return foundTask;
    }

    // Task 7: Generate new Task through Rendering
    render() {
        const tasksHtmlList = [];
        const inProgressTasksHtmlList = [];
        const reviewTasksHtmlList = [];
        const doneTasksHtmlList = [];
    
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            const taskHtml = createTaskHtml(
                task.id, 
                task.name, 
                task.description, 
                task.assignedTo, 
                formattedDate, 
                task.status
                );
            
                if (task.status === "To-do") {
                    tasksHtmlList.push(taskHtml);
                  } else if (task.status === "In Progress") {
                    inProgressTasksHtmlList.push(taskHtml);
                  } else if (task.status === "Review") {
                    reviewTasksHtmlList.push(taskHtml);
                  } else {
                    doneTasksHtmlList.push(taskHtml);
                  } 
        }

        const tasksHtml = tasksHtmlList.join('\n');
        document.querySelector('#tasksList').innerHTML = tasksHtml;
        const inProgressTaskHtml = inProgressTasksHtmlList.join('\n');
        document.querySelector('#inProgressTasksList').innerHTML = inProgressTaskHtml;
        const reviewTaskHtml = reviewTasksHtmlList.join('\n');
        document.querySelector('#reviewTasksList').innerHTML = reviewTaskHtml;
        const doneTaskHtml = doneTasksHtmlList.join('\n');
        document.querySelector('#doneTasksList').innerHTML = doneTaskHtml;
        
    }

    save() {
        const tasksJson = JSON.stringify(this.tasks);

        localStorage.setItem('tasks', tasksJson);

        const currentId = String(this.currentId);

        localStorage.setItem('currentId', currentId);
    }

    load() {
        if (localStorage.getItem('tasks')) {
            const tasksJson = localStorage.getItem('tasks');

            this.tasks = JSON.parse(tasksJson);
        }

        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');

            this.currentId = Number(currentId);
        }
    }
}

// Drag and Drop Functionality - Work on this later

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));
    
  }
  

// Hamburger animation for the navigation bar 
  
  const hamburger = document.querySelector('.hamburger');
  
  hamburger.addEventListener('click', function () {
  this.classList.toggle('is-active');
  });
  

// Search bar functionality to search tasks by title

function serach(value) {
    var filter,
        i, li,
        txtValue;
    filter = value.toUpperCase();
    li = $("li");
    for (i = 0; i < li.length; i++) {
        txtValue = $(li[i]).find("small").text();
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

$("#search-input").keyup(function (e) {
    var search;
    search = e.target.value
    serach(search);
});

