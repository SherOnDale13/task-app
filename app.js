const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filterInput.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        appendListItem(task);
    });
}

function addTask(event) {
    event.preventDefault();
    if (taskInput.value.trim() === '') {
        alert('Add a task');
    } else {
        appendListItem(taskInput.value);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';
    }
}

function removeTask(event) {
    if (event.target.parentElement.classList.contains('delete-item'))
        if (confirm('Are you sure?')) {
            event.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(
                event.target.parentElement.parentElement.firstChild.textContent
            );
        }
}

function clearTasks(event) {
    if (confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}

function filterTasks(event) {
    const text = event.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) === -1)
            task.style.display = 'none';
        else task.style.display = 'block';
    });
}

function appendListItem(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) tasks = [];
    else tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks;
}

function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach((taskItem, index) => {
        if (task === taskItem) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
