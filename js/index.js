// Task 7: Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
// Task 9: Load the tasks from localStorage
taskManager.load();
// Task 9: Render the loaded tasks to the page
taskManager.render();


// Task 5: Display the dates
function printTime() {
    let d = new Date();
    let hours = d.getHours();
    let mins = d.getMinutes();
    let secs = d.getSeconds();
    let day = d.getDay();
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    
        
      switch (month){
                
        case 0:
            month = "January";
            break;

        case 1:
            month = "February";
            break;

        case 2:
            month = "March";
            break;

        case 3:
            month = "April";
            break;

        case 4:
            month = "May";
            break;

        case 5:
            month = "June";
            break;

        case 6:
            month = "July";
            break;

        case 7:
            month = "August";
            break;

        case 8:
            month = "September";
            break;

        case 9:
            month = "October";
            break;

        case 10:
            month = "November";
            break;
            
        case 11:
            month = "December";
            break;
      }


        switch (day){
        
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
                break;
           }
    
        if (d.getHours() >= 12){
            ampm = "PM";
        } else {
            ampm = "AM";
        }
        
        if(hours>12) {
            hours = hours - 12;
        } else {
            hours = hours
        }
        if(mins<10){
            
            mins = "0" + mins;
        }
        if(secs<10){
  
            secs = "0" + secs;
        }
   
  month = month; document.getElementById("time-display").innerHTML = hours + ":" + mins + ":" + secs + " " + ampm;
  document.getElementById("date-display").innerHTML = day + ", " + date + "  " + month + "  " + year;
  }
  setTimeout(printTime, 1);
  setInterval(printTime, 1000);
  
  // Blocks out previous dates on calendar 
  
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; 
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("newTaskDuedate").setAttribute("min", today);
  

const newTaskForm = document.querySelector('#newTaskForm');

newTaskForm.addEventListener('submit', (event) => {

    let validateName = document.querySelector("#newTaskName");
    let validateDescription = document.querySelector("#newTaskDescription");
    let validateAssignedTo = document.querySelector("#newTaskAssignedTo");
    let validateDueDate = document.querySelector("#newTaskDuedate");
    let validateStatus = document.querySelector("#newTaskStatus");
    let validationFail = 0;

    event.preventDefault();
    event.stopPropagation();

    console.log("Task Name :" + validateName.value.length);
    console.log("Task Description :" + validateDescription.value.length);
    console.log("Task Assigned To :" + validateAssignedTo.value.length);
    console.log("Task Due Date :" + validateDueDate.value);
    console.log("Task Status:" + validateStatus.value);

  // Call this to clear all the form fields after the submission
  const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateAssignedTo.value = "";
    validateStatus.value = "";
    validateDueDate.value = "";
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateAssignedTo.classList.remove("is-valid");
    validateStatus.classList.remove("is-valid");
    validateDueDate.classList.remove("is-valid");
  };

  let todaysDate = new Date(Date.now())
          .toLocaleString()
          .split(",")[0]
          .split("/");
        let day = todaysDate[0];
        let month = todaysDate[1];
        let year = todaysDate[2];
        // taskDueDate is in yyyy-mm-dd format
        let taskDueDate = validateDueDate.value.split("-");
  
  
  // Form validation for Task Name Field for min length 5
  if ((validateName.value.length > 5) && (validateName.value !==null && validateName.value !=="")) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field for min length 5
  if ((validateDescription.value.length > 5) && (validateDescription.value !==null && validateDescription.value !=="")) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Assigned Field for min length 5
  if ((validateAssignedTo.value.length > 5) && (validateAssignedTo.value !==null && validateAssignedTo.value !=="")) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }
  console.log(
    `taskDueDate[2]:${taskDueDate[2]} day:${day} taskDueDate[1]:${taskDueDate[1]} month:${month} taskDueDate[0]:${taskDueDate[0]} year:${year}`
  );

  if  (validateStatus.value !==null && validateStatus.value !=="") {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Task Status Field for not empty
  if (validateStatus.value !==null && validateStatus.value !=="") {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");
    validationFail++;
  }
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    // Push the valid input into our tasks array
    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validateAssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );
    clearFormFields();
    taskManager.save();
    taskManager.render();
    $('#reg-modal').modal('hide')
  }
});

// Task 8 & Task 10 together 
const tasksList = document.querySelector('#tasksList');
tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'Done';

        taskManager.save();

        taskManager.render();
    } 

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});

const inProgressTasksList = document.querySelector('#inProgressTasksList');

inProgressTasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'Done';

        taskManager.save();

        taskManager.render();
    } 

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});

const reviewTasksList = document.querySelector('#reviewTasksList');

reviewTasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'Done';

        taskManager.save();

        taskManager.render();
    } 

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});

const doneTasksList = document.querySelector('#doneTasksList');

doneTasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'Done';

        taskManager.save();

        taskManager.render();
    } 

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});