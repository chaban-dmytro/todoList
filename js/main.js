const taskInput = document.getElementById("text-task");
const filters = document.querySelectorAll(".controls_filter span");
const clearCompleted = document.querySelector(".controls_del");
const taskBox = document.querySelector(".todo-wrapper");
let totalTaskCount = document.querySelector( ".controls_count" );
let totalCompletedTasks = document.querySelector( ".js-competed-counter" )

clearCompleted.addEventListener( "click", clearCompletedTasks );
taskInput.addEventListener( "keydown", addNewTask );

let todos = JSON.parse( localStorage.getItem( "todo-list" ) );

counter();

function counter() {
  totalTaskCount.textContent = todos.filter( todo => todo.status === "pending" ).length;
  let completedCounter = todos.filter( todo => todo.status === "completed" ).length;
  totalCompletedTasks.innerHTML = `(${completedCounter})`;
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.btn-active").classList.remove("btn-active");
    btn.classList.add("btn-active");
    showTodo(btn.id);
  })
});

function showTodo(filter) {
  let li = "";
  if(todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if(filter == todo.status || filter == "all") {
        li += `<li class="todo-item">
                <label class="todo-item_lable" for="${id}">
                  <input class="todo-status" onclick="updateStatus(this)"type="checkbox" id="${id}" ${isCompleted}>
                  <span class="custom-checkbox"></span>
                  <div class="todo-description ${isCompleted}">${todo.name}</div>
                </label>
                <button class="todo-btn-del" onclick="deleteTask(${id})"></button>
              </li>`;
      }
    });
  }
  taskBox.innerHTML = li || `<span> You don't have any tasks here <span>`;
}

showTodo("all");

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo( "all" );
  counter();
}

function clearCompletedTasks(event) {
  todos = todos.filter( todo => todo.status === "pending" );
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo( "all" );
  counter();
};

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed"
    // console.log(selectedTask.id);
  }
  else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending"
  }
  localStorage.setItem( "todo-list", JSON.stringify( todos ) );
  counter();
}

function addNewTask( event ) {
  let userTask = taskInput.value.trim();
  if(event.code == "Enter" && userTask) {
    if(!todos) {
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo( "all" );
    counter();
  }
}





