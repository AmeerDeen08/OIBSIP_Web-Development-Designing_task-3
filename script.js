const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title || !desc) return;

    const task = { id: Date.now(), title, desc, completed: false };
    tasks.push(task);
    renderTasks();

    form.reset();
});

function renderTasks() {
    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach(task => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${task.title}</td>
            <td>${task.desc}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;

        if (task.completed) {
            completedTasks.appendChild(tr);
        } else {
            pendingTasks.appendChild(tr);
        }
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    titleInput.value = task.title;
    descInput.value = task.desc;
    deleteTask(id);
}
