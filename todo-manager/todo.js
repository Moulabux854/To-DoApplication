// Add an event listener to the task form that triggers on form submission
document.getElementById('task-form').addEventListener('submit', function(e) {  
    e.preventDefault(); // Prevent form submission  

    // Get the input field for the task from the DOM
    const taskInput = document.getElementById('task-input'); 
    // Retrieve the current value of the task input field 
    const taskText = taskInput.value;  

    // Check if the input field is not empty
    if (taskText) {  
        addTask(taskText);  
        taskInput.value = ''; // Clear input  
    }  
});  

 // Function to handle button clicks
 function handleClick(buttonName) {
    // Display an alert with the button name
    alert(buttonName + ' button clicked!');
 }

function addTask(taskText) { 
    // Get the task list element from the DOM using its ID 
    const taskList = document.getElementById('task-list'); 
    // Create a new list item element to represent the task 
    const newTask = document.createElement('li');  

    // Set the inner HTML of the new task item with a checkbox, task text, date, and delete button
    newTask.innerHTML = `  
        <input type="checkbox">  
        <span class="task">${taskText}</span>  
        <span class="date">Today at 14:00</span>  
        <button class="delete-btn">×</button>
    `;  
    // Append the newly created task item to the task list
    taskList.appendChild(newTask);  
}

// Add event delegation for delete buttons
document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
    }
});
