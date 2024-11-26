// script.js  

document.addEventListener('DOMContentLoaded', loadTasks);  
document.getElementById('addTaskButton').addEventListener('click', addTask);  
document.getElementById('filterSelect').addEventListener('change', filterTasks);  

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  

function loadTasks() {  
    tasks.forEach(task => renderTask(task));  
}  

function addTask() {  
    const taskInput = document.getElementById('taskInput');  
    const categorySelect = document.getElementById('categorySelect');  
    const taskName = taskInput.value.trim();  
    const category = categorySelect.value;  

    if (taskName === '') return; // Prevent empty tasks  

    const task = {   
        id: Date.now(), // Unique ID   
        name: taskName,  
        category: category,  
        completed: false   
    };  

    tasks.push(task);  
    saveTasks();  
    renderTask(task);  
    taskInput.value = ''; // Clear the input field  
}  

function renderTask(task) {  
    const taskList = document.getElementById('taskList');  
    const li = document.createElement('li');  
    li.setAttribute('data-id', task.id);  
    li.textContent = task.name;  
    li.classList.toggle('completed', task.completed);  
    li.addEventListener('click', () => toggleComplete(task.id));  
    
    const deleteButton = document.createElement('button');  
    deleteButton.textContent = 'Delete';  
    deleteButton.classList.add('delete');  
    deleteButton.addEventListener('click', (e) => {  
        e.stopPropagation(); // Prevent triggering the complete toggle  
        deleteTask(task.id);  
    });  

    li.appendChild(deleteButton);  
    taskList.appendChild(li);  
}  

function toggleComplete(id) {  
    const task = tasks.find(t => t.id === id);  
    task.completed = !task.completed;  
    saveTasks();  
    document.querySelector(`li[data-id="${id}"]`).classList.toggle('completed', task.completed);  
}  

// Filter tasks by category  
function filterTasks() {  
    const filterValue = document.getElementById('filterSelect').value;  
    const taskList = document.getElementById('taskList');  
    taskList.innerHTML = ''; // Clear current displayed tasks  
    const filteredTasks = filterValue === 'All' ? tasks : tasks.filter(task => task.category === filterValue);  
    filteredTasks.forEach(renderTask);  
}  

function deleteTask(id) {  
    tasks = tasks.filter(t => t.id !== id);  
    saveTasks();  
    document.querySelector(`li[data-id="${id}"]`).remove();  
}  

function saveTasks() {  
    localStorage.setItem('tasks', JSON.stringify(tasks));  
}