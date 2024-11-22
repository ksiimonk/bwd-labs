document.addEventListener("DOMContentLoaded", function () {
  const todoColumn = document.getElementById("todo-column");
  const inProgressColumn = document.getElementById("in-progress-column");
  const doneColumn = document.getElementById("done-column");

  // Загрузка задач из localStorage
  const tasksData = JSON.parse(localStorage.getItem("tasksData")) || {
    todo: [],
    inProgress: [],
    done: []
  };

  // Функция для рендера задач
  function renderTasks() {
    // Очистка содержимого колонок
    todoColumn.innerHTML = '<h2>Задачи</h2>';
    inProgressColumn.innerHTML = '<h2>В процессе</h2>';
    doneColumn.innerHTML = '<h2>Выполнены</h2>';

    // Отрисовка задач из localStorage
    tasksData.todo.forEach(task => createTaskElement(task, todoColumn, "todo"));
    tasksData.inProgress.forEach(task => createTaskElement(task, inProgressColumn, "inProgress"));
    tasksData.done.forEach(task => createTaskElement(task, doneColumn, "done"));
  }

  // Функция для создания задачи
  function createTaskElement(task, parentColumn, status) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    if (status === "done") {
      taskItem.classList.add("completed"); // Добавляем класс "completed" для задач в столбце "Выполнены"
    }

    taskItem.innerHTML = `
      <input type="checkbox" ${status === "done" ? "checked" : ""} />
      ${task}
      <button class="button delete-btn">Удалить</button>
    `;
    parentColumn.appendChild(taskItem);

    // Обработчик для изменения статуса задачи
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => handleTaskStatusChange(task, status));

    // Обработчик для удаления задачи
    const deleteBtn = taskItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => handleTaskDelete(task, status));
  }

  // Обработчик изменения статуса
  function handleTaskStatusChange(task, currentStatus) {
    let newStatus;

    // Определяем новый статус
    if (currentStatus === "todo") {
      newStatus = "inProgress";
    } else if (currentStatus === "inProgress") {
      newStatus = "done";
    } else if (currentStatus === "done") {
      return; // Если задача уже выполнена, ничего не делаем
    }

    // Перемещение задачи в новый статус
    tasksData[currentStatus] = tasksData[currentStatus].filter(t => t !== task);
    tasksData[newStatus].push(task);
    

    // Сохранение изменений
    localStorage.setItem("tasksData", JSON.stringify(tasksData));

    // Перерендеринг задач
    renderTasks();
  }

  // Обработчик удаления задачи
  function handleTaskDelete(task, status) {
    tasksData[status] = tasksData[status].filter(t => t !== task);
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    renderTasks();
  }

  // Первоначальный рендер задач
  renderTasks();
  
    const openDialogButton = document.getElementById("open-dialog-btn");
    const dialog = document.getElementById("task-dialog");
    const closeDialogButton = document.getElementById("close-dialog-btn");
    const submitTaskBtn = document.getElementById("submit-task-btn");
    const taskInput = document.getElementById("task-input");
  
    // Открытие модального окна при нажатии на кнопку "Добавить"
    openDialogButton.addEventListener("click", function () {
      dialog.showModal();
    });
  
    // Закрытие модального окна при нажатии на кнопку "Отмена"
    closeDialogButton.addEventListener("click", function () {
      dialog.close();
    });
  
    // Добавление задачи при нажатии на кнопку "Добавить"
    submitTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        // Сохранение задачи в localStorage
        const tasksData = JSON.parse(localStorage.getItem("tasksData")) || {
          todo: [],
          inProgress: [],
          done: []
        };
  
        tasksData.todo.push(taskText);
        localStorage.setItem("tasksData", JSON.stringify(tasksData));

        location.reload();
  
        // Добавление задачи в колонку "todo"
        createTaskElement(taskText, todoColumn, "todo");
        
        // Очистка поля ввода и закрытие модального окна
        taskInput.value = "";
        dialog.close();
      }
    });
  
    // Закрытие модального окна при нажатии за его пределами
    dialog.addEventListener("click", function (event) {
      const dialogBounds = dialog.getBoundingClientRect();
      if (
        event.clientX < dialogBounds.left ||
        event.clientX > dialogBounds.right ||
        event.clientY < dialogBounds.top ||
        event.clientY > dialogBounds.bottom
      ) {
        dialog.close();
      }
    })
})