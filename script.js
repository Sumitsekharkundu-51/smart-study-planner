const taskNameInput = document.getElementById('task-name');
const taskDueDateInput = document.getElementById('task-due-date');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <div class="task-details">
                <span class="task-title">${task.name}</span>
                <span class="task-date">Due: ${new Date(task.dueDate).toLocaleString()}</span>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
                <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

const addTask = () => {
    const name = taskNameInput.value.trim();
    const dueDate = taskDueDateInput.value;

    if (name === '' || dueDate === '') {
        alert('Please enter a task name and due date.');
        return;
    }

    const newTask = { name, dueDate, completed: false };
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskNameInput.value = '';
    taskDueDateInput.value = '';
};

const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

addTaskBtn.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', renderTasks);