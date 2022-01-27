// hamburger animation 

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function () {
  this.classList.toggle('is-active');
});

// Drag & Drop 

const tasks = document.querySelectorAll(".task");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

tasks.forEach((task) => {
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

// Task 5: Date Display 

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
 
month = month + 1; document.getElementById("time-display").innerHTML = hours + ":" + mins + ":" + secs;
document.getElementById("date-display").innerHTML = day + ", " + date + "  " + monthName[month] + "  " + year;
}
setTimeout(printTime, 1);
setInterval(printTime, 1000);

// Delete task

const delete_btns = document.querySelectorAll(".delete");

delete_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});


