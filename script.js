document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let title = document.getElementById("task-title").value;
    let deadline = document.getElementById("task-deadline").value;
    let priority = document.getElementById("task-priority").value;

    if (title === "" || deadline === "") {
        alert("Please enter task details!");
        return;
    }

    let task = { title, deadline, priority, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task-title").value = "";
    document.getElementById("task-deadline").value = "";

    loadTasks();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.add(task.priority.toLowerCase());

        let deadlineDate = new Date(task.deadline);
        let now = new Date();
        let timeLeft = Math.max(0, deadlineDate - now);
        let daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.title} - Due in ${daysLeft} day(s) 
                (${task.priority})
            </span>
            <button onclick="toggleComplete(${index})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}