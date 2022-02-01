const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html =  `<li class="task" id="task" draggable="true" ondragstart="drag(event)">
  <div class="task-content">
  <p class="card-title" style="font-weight:900;">${name}</p>
  <p class="card-text">
  <div>${description}</div>
  <div>${assignedTo}</div>
  <div id="due-date">${dueDate}</div>
  </p>
  <div class="card-text" id="priority" style="font-weight:500; background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,111,29,1) 50%, rgba(252,176,69,1) 100%); padding: 0 10px; border-radius: 10px; text-decoration: capitalize; text-align: center;">${status}</div>
  </div>
  <span class="edit">
  <i class='bx bx-pencil'class="btn btn-primary btn-sm p-0"></i>
  </span>
  <span class="delete">
  <i class='bx bx-x'></i>
  </span>
</li>`;
  return html;
};

// Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.currentId = currentId;
    this._tasks = [];
}
get tasks() {
    return this._tasks
}
addTask(name, description, assignedTo, dueDate, status) {
    const task = {
        id: this.currentId++,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status

    }
    this.tasks.push(task)
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

// Hamburger animation for the navigation bar 

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function () {
  this.classList.toggle('is-active');
});

// const TestTask = new TaskManager;
// const task1 = {
//     id : 1,
//     name: 'Take out the trash',
//     description: 'Take out the trash to the front of the house',
//     assignedTo: 'Nick',
//     dueDate: '2020-09-20',
//     status: 'In Progress'
    
// };

// const task2 = {
//     id : 2,
//     name: 'Cook Dinner',
//     description: 'Prepare a healthy serving of pancakes for the family tonight',
//     assignedTo: 'Nick',
//     dueDate: '2020-09-20',
//     status: 'In Progress'
// };


// console.log(TestTask.tasks);
// TestTask.addTask(this.task);
// TestTask.addTask(task1['name'],task1['description'],task1['assignedTo'],task1['dueDate'],task1['status']);
// console.table(TestTask.tasks);
// TestTask.addTask(task2['name'],task2['description'],task2['assignedTo'],task2['dueDate'],task2['status']);
// console.table(TestTask.tasks);