const taskInput = document.getElementById("text-task");
filters = document.querySelectorAll(".controls_filter span");
clearCompleted = document.querySelector(".controls_del");
taskBox = document.querySelector(".todo-wrapper");
const totalTaskCount = document.querySelector(".controls_count");

let todos = JSON.parse(localStorage.getItem("todo-list"));

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

// totalTaskCount = todos.lenght;
// console.log(totalTaskCount);

showTodo("all");

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
}

clearCompleted.addEventListener("click", () => {
  todos.forEach((todo, status) => {
    if(todo.status == "completed") {
      // todos.splice(todo);
    }
  });
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
});

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed"
  }
  else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending"
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
  let userTask = taskInput.value.trim();
  if(e.key == "Enter" && userTask) {
    if(!todos) {
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
  }
})

// const controlsCount = document.querySelector(".controls_count");
// controlsCount.textContent = todos.lenght;
// console.log(controlsCount);
// const controlCount = todos.lenght;
// console.log(controlCount);



