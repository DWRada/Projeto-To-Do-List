// Variáveis que armazenaremos nossos dados do input e da lista de tarefas.
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('inputTask');

// Mensagem inicial.
const emptyMessageHTML = `<li id="emptyMessage">Nenhuma tarefa ainda.<br>Adicione uma para começar!</li>`;

// Função adicionar tarefa.
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }
// Verifica se temos tarefas e deletamos a mensagem inicial.
    const emptyMessageElement = document.getElementById('emptyMessage');
    if (emptyMessageElement) {
        taskList.innerHTML = ''; // Esvazia o aquário (remove a mensagem)
    }

// Cria a nossa nova <li>.
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Deletar</button>
    `;

// Variaveis do checkbox, da tarefa e do botão de deletar.
    const checkbox = listItem.querySelector('.task-checkbox');
    const taskSpan = listItem.querySelector('.task-text');
    const deleteBtn = listItem.querySelector('.delete-btn');

// Sensor do checkbox.
    checkbox.addEventListener('change', function() {
        taskSpan.classList.toggle('completed');
        updateCounters();
    });

// Botão de deletar com atuação do contador.
    deleteBtn.addEventListener('click', function() {
        listItem.remove();
        if (taskList.children.length === 0) {
            taskList.innerHTML = emptyMessageHTML;
        }
        updateCounters();
    });

    taskList.appendChild(listItem);
    updateCounters();

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

// Inicializa os contadores quando a página carrega
updateCounters();
