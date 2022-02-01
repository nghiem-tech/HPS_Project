const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `<li class="task card" id="task" draggable="true" data-task-id="${id}" ondragstart="drag(event)">
        <div class="card-body">
        <h6 class="card-title">${name}</h6>
        <p class="card-text">
          ${description}
        </p>
        <p class="card-text">${assignedTo}</p>
        <p class="card-text">${dueDate}</p>
        <div class="row">
          <div class="col-6">
            <p class="card-text"><b>${status}</b></p>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-success done-button" onclick="appendIt()">
              Done
            </button>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-danger delete-button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
</li>`;
  return html;
};

// Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate, status) {
    // Create a task object that we will push to the list of tasks

    const task = {
      // Increment the current Id for each new task
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);
  }

  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  }

  render() {
    const toDoTasksHtmlList = [];
    const inProgressTasksHtmlList = [];
    const reviewTasksHtmlList = [];
    const doneTasksHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {

        const currentTask = this.tasks[i];
        const currentDate = new Date(currentTask.dueDate)
        const formattedDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
        const tag = document.querySelector("priority");

        const taskHtml = createTaskHtml(
            currentTask.id,
            currentTask.name,
            currentTask.description,
            currentTask.assignedTo,
            formattedDate,
            currentTask.status
        );

        switch (currentTask.status) {
            case "done":
                doneTasksHtmlList.push(taskHtml);
                break;

            case "review":
                reviewTasksHtmlList.push(taskHtml);
                break;

            case "inProgress":
                inProgressTasksHtmlList.push(taskHtml);
                break;

            default:
                toDoTasksHtmlList.push(taskHtml);
        }

    }

    const todoTaskHtml = toDoTasksHtmlList.join('\n');
    const inProgressTaskHtml = inProgressTasksHtmlList.join('\n');
    const reviewTaskHtml = reviewTasksHtmlList.join('\n');
    const doneTaskHtml = doneTasksHtmlList.join('\n');
    

    const todoTasksList = document.getElementById('toDoList');
    const inProgressTasksList = document.getElementById('inProgressList');
    const reviewTasksList = document.getElementById('reviewList');
    const doneTasksList = document.getElementById('doneList');
    

    todoTasksList.innerHTML = todoTaskHtml;
    inProgressTasksList.innerHTML = inProgressTaskHtml;
    reviewTasksList.innerHTML = reviewTaskHtml;
    doneTasksList.innerHTML = doneTaskHtml;
  }

  save() {
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this.tasks);

    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }
  
  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }
}

// Drag and Drop Functionality

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
}

// Move task cards into done list upon click 

function appendIt() {
  const source = document.getElementById("task");
  document.getElementById("doneList").appendChild(source);
  ev.dataTransfer.setData("text", ev.target.id);
 }


// Hamburger animation for the navigation bar 

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function () {
this.classList.toggle('is-active');
});

