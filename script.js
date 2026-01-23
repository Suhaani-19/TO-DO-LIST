const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const form = document.getElementById("todo-form"); // if you have form in HTML

// ---------- Load tasks on page start ----------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// ---------- Add Task ----------
function addTask(taskText) {
  const text = taskText.trim();

  if (text === "") {
    alert("You must write something!");
    return;
  }

  const newTask = {
    id: Date.now(),        // unique id
    text: text,
    checked: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  inputBox.value = "";
}

// ---------- Render Tasks ----------
function renderTasks() {
  listContainer.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.textContent = task.text;

    if (task.checked) li.classList.add("checked");

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
  });
}

// ---------- Save to localStorage ----------
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------- Handle Click (Check/Delete) ----------
listContainer.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const taskId = Number(li.getAttribute("data-id"));

  // Delete task (if clicked on X)
  if (e.target.tagName === "SPAN") {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
    return;
  }

  // Toggle check
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, checked: !task.checked } : task
  );

  saveTasks();
  renderTasks();
});

// ---------- Form Submit ----------
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(inputBox.value);
  });
}

// ---------- Enter Key (if form not present) ----------
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !form) {
    addTask(inputBox.value);
  }
});
