const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const toggle = document.getElementById("darkModeToggle");

window.onload = function () {

  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => createTask(task.text, task.completed));

  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark");
    toggle.checked = true;
  }
};

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  createTask(text, false);
  taskInput.value = "";
  saveTasks();
}

function createTask(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.onclick = function (e) {
    e.stopPropagation(); 
    li.remove();
    saveTasks();
  };

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});
