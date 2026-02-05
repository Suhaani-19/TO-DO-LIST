// Get input box where user types the task
const inputBox = document.getElementById("input-box");

// Get the container where tasks will be displayed
const listContainer = document.getElementById("list-container");

// Get the form (if present)
const form = document.getElementById("todo-form");

// Load tasks from localStorage OR start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
renderTasks();

// ---------- Add a New Task ----------
function addTask(taskText) {
  // Remove extra spaces from beginning and end
  const text = taskText.trim();

  // Prevent adding empty tasks
  if (text === "") {
    alert("You must write something!");
    return;
  }

  // Create a new task object
  const newTask = {
    id: Date.now(),       // Unique ID using timestamp
    text: text,           // Task text
    checked: false        // Task completion status
  };

  // Add task to array
  tasks.push(newTask);

  // Save updated tasks to localStorage
  saveTasks();

  // Re-render task list
  renderTasks();

  // Clear input box after adding task
  inputBox.value = "";
}

// ---------- Render Tasks on UI ----------
function renderTasks() {
  // Clear existing list before re-rendering
  listContainer.innerHTML = "";

  // Loop through each task
  tasks.forEach((task) => {
    // Create list item
    const li = document.createElement("li");

    // Store task id in data attribute
    li.setAttribute("data-id", task.id);

    // Set task text
    li.textContent = task.text;

    // If task is completed, add checked class
    if (task.checked) li.classList.add("checked");

    // Create delete button (X)
    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; // × symbol

    // Add delete button inside li
    li.appendChild(span);

    // Add li to the task list container
    listContainer.appendChild(li);
  });
}

// ---------- Save Tasks to localStorage ----------
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------- Handle Click Events (Check/Delete) ----------
listContainer.addEventListener("click", (e) => {
  // Find closest li (in case span is clicked)
  const li = e.target.closest("li");
  if (!li) return;

  // Get task id from li
  const taskId = Number(li.getAttribute("data-id"));

  // If delete button (X) is clicked
  if (e.target.tagName === "SPAN") {
    // Remove task from array
    tasks = tasks.filter((task) => task.id !== taskId);

    saveTasks();
    renderTasks();
    return;
  }

  // Toggle checked status when li is clicked
  tasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, checked: !task.checked }
      : task
  );

  saveTasks();
  renderTasks();
});

// ---------- Handle Form Submit ----------
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh
    addTask(inputBox.value);
  });
}

// ---------- Handle Enter Key (If Form Is Not Present) ----------
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !form) {
    addTask(inputBox.value);
  }
});
