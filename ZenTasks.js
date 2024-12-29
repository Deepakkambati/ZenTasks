document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    // Handle adding a new task
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("taskName").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;

        // Get today's date for validation
        const today = new Date().toISOString().split('T')[0];

        // Check if the due date is today or later
        if (dueDate && dueDate < today) {
            alert("Due Date must not be in the past.");
            return;
        }

        if (taskName.trim() === "") {
            alert("Task Name is required.");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        taskItem.innerHTML = `
            <div class="task-info">
                <strong>${taskName}</strong> 
                <p>${taskDescription}</p>
                <small>Due: ${dueDate ? dueDate : "N/A"} | Priority: ${priority}</small>
            </div>
            <div class="task-actions">
                <button class="btn btn-success btn-sm complete-btn">Complete</button>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </div>
        `;

        // Prepend task to the top of the list
        taskList.prepend(taskItem);

        // Show task added confirmation message
        showPopup("Task Added!");

        // Reset form
        taskForm.reset();
    });

    // Handle task actions (Complete, Delete)
    taskList.addEventListener("click", function(event) {
        const target = event.target;

        // Mark task as complete
        if (target.classList.contains("complete-btn")) {
            const taskItem = target.closest("li");
            const completeButton = taskItem.querySelector(".complete-btn");
            const deleteButton = taskItem.querySelector(".delete-btn");

            completeButton.remove();
            deleteButton.remove();

            const completedLabel = document.createElement("span");
            completedLabel.classList.add("badge", "bg-success");
            completedLabel.textContent = "Completed";

            taskItem.querySelector(".task-info").appendChild(completedLabel);

            // Move task to the Completed Tasks section
            const completedList = document.getElementById("completedList");
            completedList.appendChild(taskItem);
        }

        // Confirm and delete task
        if (target.classList.contains("delete-btn")) {
            const taskItem = target.closest("li");

            const confirmation = confirm("Do you really want to delete this task?");
            if (confirmation) {
                // Show task deleted confirmation message with red background
                showPopup("Task Deleted!", "red");

                // Remove the buttons (Complete and Delete)
                const completeButton = taskItem.querySelector(".complete-btn");
                const deleteButton = taskItem.querySelector(".delete-btn");
                completeButton.remove();
                deleteButton.remove();

                // Add the "Deleted" label
                const deletedLabel = document.createElement("span");
                deletedLabel.classList.add("badge", "bg-danger");
                deletedLabel.textContent = "Deleted";
                taskItem.querySelector(".task-info").appendChild(deletedLabel);

                // Move task to the Deleted Tasks section
                const deletedList = document.getElementById("deletedList");
                deletedList.appendChild(taskItem);
            }
        }
    });

    // Function to show popup messages
    function showPopup(message, bgColor = "#28a745") {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.textContent = message;
        popup.style.backgroundColor = bgColor; // Set background color dynamically

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 2000); // Remove after 2 seconds
    }
});