// Импортирование обьектов для приложения
import * as toDo from './functions.js';

// Инициализация экземпляр класса ToDo приложения
let application = new toDo.Application({
    $selector: '#app'
});

// Выгрузка задач
application.unloadTasks();
// Проверка существования заглушки
application.checkEmptyList();

// Прослушиватель событий по нажатию
application.$selector.addEventListener('click', (e) => {
    
    // Отключение отправки формы по событию
    e.preventDefault();

    // Инициализация экземпляр класса задачи
    let taskObj = new toDo.Task({
        text: toDo.taskInput.value,
    });

    // Проверка нажатий на кнопки
    switch (e.target.dataset.btnAction) {
        case "add": 
            // Добавление задачи
            taskObj.addToList();
            break;

        case "done":
            // Добавление статуса "Выполнено"
            taskObj.doneTask(e);
            break;

        case "delete":
            // Удаление задачи
            taskObj.deleteTask(e);
            break;

        case "delete-tasks":
            // Удаления задач со статусом "Выполнено"
            application.clearTasks();
            break;
    }
});