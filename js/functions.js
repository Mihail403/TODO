// ID приложения ToDo
export const app = document.getElementById('app');
// Поле текста задачи
export const taskInput = document.getElementById('taskInput');

// Список задач
const tasksList = document.getElementById('tasksList');
// Заглушка
const emptyList = document.getElementById('emptyList');


// обьекта приложения
export class Application {

    constructor(options) {
        this.$selector = document.querySelector(options.$selector);
    }

    // Загрузка задач в хранилище...
    loadTasks() {

        // Добавление HTML разметки задач в локальное хранилище
        localStorage.setItem("TASKS", tasksList.innerHTML);

    }

    // Выгрузка задач из хранилища...
    unloadTasks() {

        // Проверка на существование элемента
        if (localStorage.getItem("TASKS")) {

            // Выгрузка HTML разметки задач
            tasksList.innerHTML = localStorage.getItem("TASKS");

        }

    }

    // Функция по очистке выполненных задач из списка
    clearTasks() {

        // Элементы со статусом "Выполнено"
        const tasksDone = document.querySelectorAll(".task-title.done");

        // Перебор элементов и их удаление
        for (let i = 0; i < tasksDone.length; i++) {

            // Удаление элемента
            tasksDone[i].closest('.task-item').remove();

            // Обновление задач в хранилище
            this.loadTasks();

            // Проверка существования заглушки
            this.checkEmptyList();
        }
    }

    // Функция на проверку существования заглушки
    checkEmptyList() {

        // Проверка есть ли элемент в списке
        !tasksList.querySelector('.task-item')
        ? emptyList.classList.remove("none")
        : emptyList.classList.add("none");
    }
}

// обьекта задачи
export class Task extends Application {

    constructor(options) {
        super(options);
        this.text = options.text;
    }

    // Функция добавления задачи в список задач
    addToList() {

        // Проверка на пустоту ввода пользователя
        if (taskInput.value.trim() != "") {
            
            // Добавление DOM обьекта в контейнер списка 
            tasksList.insertAdjacentHTML('beforeend', `
                <li class="list-group-item d-flex justify-content-between task-item">
                    <span class="task-title">${this.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-btn-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-btn-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>
            `);
        }

        // Обновление задач в хранилище
        this.loadTasks();

        // Проверка существования заглушки
        this.checkEmptyList();

        // Очистка поля при вводе пользователя
        taskInput.value = "";
    }

    // Функция присвоения статуса выполнения задачи
    doneTask(e) {

        // Элемент списка
        const taskItem = e.target.closest(".task-item");

        // Добавление и удаление класса "done"
        taskItem.querySelector('.task-title').classList.toggle("done");

        // Обновление задач в хранилище
        this.loadTasks();
    }

    // Фукнция удаления задачи из списка
    deleteTask(e) {

        // Элемент списка
        const taskItem = e.target.closest(".task-item");

        // Удаление элемента по ссылке
        taskItem.remove();

        // Обновление задач в хранилище
        this.loadTasks();

        // Проверка существования заглушки
        this.checkEmptyList();
    }
    
}