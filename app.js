const form = document.querySelector("#task-form");
//tasskList ->ul
const taskList = document.querySelector(".collection");
const clearButton = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const tInput = document.querySelector("#task");

eventlistners();
//load all event listeneres
function eventlistners() {
  //dom load event ->to get the values from local storage after refresh
  document.addEventListener("DOMContentLoaded", getValues);
  form.addEventListener("submit", addTask);
  filter.addEventListener("keyup", fil);
  taskList.addEventListener("click", dtask);
  clearButton.addEventListener("click", clearAll);
}
//getValues
function getValues(e) {
  let values;
  values =
    localStorage.getItem("values") === null
      ? []
      : JSON.parse(localStorage.getItem("values"));
  values.forEach((v) => {
    const lis = document.createElement("li");
    lis.className = "collection-item";
    lis.textContent = v;
    //lis.appendChild(document.createTextNode(v));
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    lis.appendChild(link);

    taskList.appendChild(lis);
  });
}

function addTask(e) {
  if (tInput.value === "") alert("add a task");

  const lis = document.createElement("li");
  lis.className = "collection-item";
  lis.textContent = tInput.value;
  //lis.appendChild(document.createTextNode(tInput.value));
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  lis.appendChild(link);

  taskList.appendChild(lis);
  storeTaskInLs(tInput.value);
  tInput.value = "";

  e.preventDefault();
}
// storing values in local storage
function storeTaskInLs(value) {
  let values;

  if (localStorage.getItem("values") === null) {
    values = [];
  } else {
    values = JSON.parse(localStorage.getItem("values"));
  }

  values.push(value);
  localStorage.setItem("values", JSON.stringify(values));
}

//delete items
function dtask(e) {
  const di = e.target.parentElement;
  if (di.classList.contains("delete-item")) {
    if (confirm("Are You Sure!")) di.parentElement.remove();
    //remove from local storage
    removeTaskFromLocalStorage(di.parentElement);
  }
}

//remove from ls function
function removeTaskFromLocalStorage(item) {
  let values;

  if (localStorage.getItem("values") === null) {
    values = [];
  } else {
    values = JSON.parse(localStorage.getItem("values"));
  }
  
  values.forEach((value,index)=>{
       if(item.textContent===value){
           values.splice(index,1);
      }
   
  });
  localStorage.setItem("values",JSON.stringify(values));
}
function clearAll(e) {
  if (confirm(`sure!!`)) {
    //taskList.innerHTML=""; ////slower
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild); //faster
    }
  }
  clearLocalStorage();
}
//clear local storage function

function clearLocalStorage(){
    localStorage.clear();
}

function fil(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((items) => {
    const item = items.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      items.style.display = "block";
    } else {
      items.style.display = "none";
    }
  });
}
