//Task 7
const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
  const html = `<li class="pokemon" draggable="true">
  <div class="task card-body" >
            <div class="task-content">
              <p class="card-title" style="font-weight:900;">${name}</p>
              <p class="card-text">
              <div>${description}</div>
              <div>${assignedTo}</div>
              <div id="due-date">${dueDate}</div>
              </p>
              <div class="card-text" id="priority" style="font-weight:500; padding: 0 10px; border-radius: 10px; text-decoration: capitalize; text-align: center;">${status}</div>
            </div>
            <span class="edit">
              <i class='bx bx-pencil'class="btn btn-primary btn-sm p-0"></i>
            </span>
            <span class="delete">
              <i class='bx bx-x'></i>
            </span>
          </div>
  </li>`;
  return html;
};

// Task 6: Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  // Create the addTask method
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

  // Create the render method
  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }
}
