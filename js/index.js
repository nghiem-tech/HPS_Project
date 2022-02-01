// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

// Task 5: Finding and Display the Date Object

function printTime() {
  let d = new Date();
  let hours = d.getHours();
  let mins = d.getMinutes();
  let secs = d.getSeconds();
  let day = d.getDay();
  let date = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  
  const monthName = [
  'January','February','March','April',
  'May','June','July','August','September',
  'October','November','December'
];

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
 
month = month + 1; document.getElementById("time-display").innerHTML = hours + ":" + mins + ":" + secs + " " + ampm;
document.getElementById("date-display").innerHTML = day + ", " + date + "  " + monthName[month - 1] + "  " + year;
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


// Task 4: Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
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
  if ((validateName.value.length > 5) || (validateName.value==null || validateName.value =="")) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field for min length 5
  if ((validateDescription.value.length > 5) || (validateDescription.value==null || validateDescription.value =="")) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Assigned Field for min length 5
  if ((validateAssignedTo.value.length > 5) || (validateAssignedTo.value==null || validateAssignedTo.value =="")) {
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

  if (taskDueDate[0] >= year) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Task Status Field for not empty
  if (validateStatus.value) {
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
    // taskManager.save();
    taskManager.render();
  }
});
