document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const clearCompletedBtn = document.getElementById("clear-completed-btn");
    const remainingCounter = document.getElementById("remaining-counter");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    let currentFilter = "all";
  
    // Update the remaining active tasks counter.
    function updateCounter() {
      const tasks = taskList.getElementsByTagName("li");
      let count = 0;
      for (let task of tasks) {
        if (!task.classList.contains("completed")) {
          count++;
        }
      }
      remainingCounter.textContent = count;
    }
  
    // Create a new task and append it to the list.
    function addTask() {
      const taskName = taskInput.value.trim();
      if (taskName === "") return;
  
      const li = document.createElement("li");
      li.classList.add("task-item");
  
      const span = document.createElement("span");
      span.classList.add("task-name");
      span.textContent = taskName;
      span.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateCounter();
        applyFilter();
      });
  
      // Create a delete button for the task.
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateCounter();
      });
  
      // Append the task name and delete button to the list item.
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
  
      // Clear the input field and update the counter.
      taskInput.value = "";
      updateCounter();
      applyFilter();
    }
  
    // Event listeners for adding tasks.
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask();
      }
    });
  
    // Clear all completed tasks.
    clearCompletedBtn.addEventListener("click", () => {
      const tasks = taskList.getElementsByTagName("li");
      // Iterate backwards because we are removing elements.
      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].classList.contains("completed")) {
          tasks[i].remove();
        }
      }
      updateCounter();
    });
  
    // Apply the filter settings to the tasks.
    function applyFilter() {
      const tasks = taskList.getElementsByTagName("li");
      for (let task of tasks) {
        switch (currentFilter) {
          case "all":
            task.style.display = "";
            break;
          case "active":
            task.style.display = task.classList.contains("completed") ? "none" : "";
            break;
          case "completed":
            task.style.display = task.classList.contains("completed") ? "" : "none";
            break;
        }
      }
    }
  
    // Filter button event listeners.
    filterButtons.forEach(button => {
      button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
  
        // Update the current filter based on the button's ID.
        currentFilter = this.id.split("-")[1];
        applyFilter();
      });
    });
  
    updateCounter();
  });