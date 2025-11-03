// Variáveis que armazenaremos nossos dados do input e da lista de tarefas.
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('inputTask');

// Mensagem inicial.
const emptyMessageHTML = `<li id="emptyMessage">Nenhuma tarefa ainda.<br>Adicione uma para começar!</li>`;

// Função para salvar as tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').textContent;
        const isCompleted = taskItem.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks && tasks.length > 0) {
        taskList.innerHTML = ''; // Limpa a lista antes de adicionar as tarefas salvas
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    } else {
        taskList.innerHTML = emptyMessageHTML;
    }
    updateCounters();
}

// Função para criar o elemento da tarefa (refatorada de addTask)
function createTaskElement(taskText, isCompleted = false) {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Deletar</button>
    `;

    const checkbox = listItem.querySelector('.task-checkbox');
    const taskSpan = listItem.querySelector('.task-text');
    const deleteBtn = listItem.querySelector('.delete-btn');

    if (isCompleted) {
        taskSpan.classList.add('completed');
        checkbox.checked = true;
    }

    checkbox.addEventListener('change', function() {
        taskSpan.classList.toggle('completed');
        updateCounters();
        saveTasks();
    });

    deleteBtn.addEventListener('click', function() {
        listItem.remove();
        if (taskList.children.length === 0) {
            taskList.innerHTML = emptyMessageHTML;
        }
        updateCounters();
        saveTasks();
    });

    taskList.appendChild(listItem);
}


// Função adicionar tarefa (agora mais enxuta)
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    const emptyMessageElement = document.getElementById('emptyMessage');
    if (emptyMessageElement) {
        taskList.innerHTML = '';
    }

    createTaskElement(taskText);
    updateCounters();
    saveTasks();

    taskInput.value = '';
    taskInput.focus();
}

// Função para atualização dos contadores em tempo real.
function updateCounters() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-text.completed').length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
}

// Adiciona um listener para o evento de pressionar "Enter" no campo de input
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


// Carrega as tarefas quando a página é carregada
document.addEventListener('DOMContentLoaded', loadTasks);
