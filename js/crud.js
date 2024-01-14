const btnAddTaks = document.querySelector(".app__button--add-task");
const formAddTaks = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTasks = document.querySelector(".app__section-task-list");
const cancelBtn = document.querySelector(".app__form-footer__button--cancel");
const pDescTask = document.querySelector(
  ".app__section-active-task-description"
);

const removeCompleteBtn = document.querySelector("#btn-remover-concluidas");
const removeAllItens = document.querySelector("#btn-remover-todas");

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let liSelectedTask = null;

function cleanForm() {
  textarea.value = "";
  formAddTaks.classList.add("hidden");
}

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTaks(task) {
  const li = document.createElement("li");

  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                          <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
                      </svg>`;
  const p = document.createElement("p");
  p.classList.add("app__section-task-list-item-description");
  p.textContent = task.description;

  //cria botão edit no item tarefa
  const editBtn = document.createElement("button");
  editBtn.classList.add("app_button-edit");

  editBtn.onclick = () => {
    const newDescription = prompt("Qual o novo nome da tarefa?");
    if (newDescription) {
      p.textContent = newDescription;
      task.description = newDescription;
      updateTasks();
    }
  };

  //adiciona o icone de lapis no botao edit da tarefa.
  const imgEditBtn = document.createElement("img");
  imgEditBtn.setAttribute("src", "/img/edit.png");
  editBtn.append(imgEditBtn);

  li.append(svg);
  li.append(p);
  li.append(editBtn);

  if (task.complete) {
    li.classList.add("app__section-task-list-item-complete");
    editBtn.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((element) => {
          element.classList.remove("app__section-task-list-item-active");
        });
      if (selectedTask == task) {
        pDescTask.textContent = "";
        li.classList.remove("app__section-task-list-item-active");
        selectedTask = null;
        liSelectedTask = null;
        return;
      }
      selectedTask = task;
      liSelectedTask = li;
      pDescTask.textContent = task.description;
      li.classList.add("app__section-task-list-item-active");
    };
  }
  return li;
}

btnAddTaks.addEventListener("click", () => {
  formAddTaks.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", cleanForm);

formAddTaks.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const task = {
    description: textarea.value,
  };

  taskList.push(task);
  const taskElement = addTaks(task);
  ulTasks.append(taskElement);
  updateTasks();
  textarea.value = "";
  formAddTaks.classList.add("hidden");
});

taskList.forEach((task) => {
  const taskElement = addTaks(task);
  ulTasks.appendChild(taskElement);
});

document.addEventListener("finishedFokus", () => {
  if (selectedTask && liSelectedTask) {
    liSelectedTask.classList.remove("app__section-task-list-item-active");
    liSelectedTask.classList.add("app__section-task-list-item-complete");
    liSelectedTask.querySelector("button").setAttribute("disabled", "disabled");
    selectedTask.complete = true;
    updateTasks();
  }
});

const removeTasks = (justComplete) => {
  const selector = justComplete
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(selector).forEach((element) => {
    element.remove();
  });
  taskList = justComplete ? taskList.filter((task) => !task.complete) : [];
  updateTasks();
};

removeCompleteBtn.onclick = () => removeTasks(true);
removeAllItens.onclick = () => removeTasks(false);
