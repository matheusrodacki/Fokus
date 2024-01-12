const btnAddTaks = document.querySelector(".app__button--add-task");
const formAddTaks = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTasks = document.querySelector(".app__section-task-list");

const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

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

  const btn = document.createElement("button");
  btn.classList.add("app_button-edit");
  const imgBtn = document.createElement("img");

  imgBtn.setAttribute("src", "/img/edit.png");

  btn.append(imgBtn);

  li.append(svg);
  li.append(p);
  li.append(btn);

  return li;
}

btnAddTaks.addEventListener("click", () => {
  formAddTaks.classList.toggle("hidden");
});

formAddTaks.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const task = {
    description: textarea.value,
  };

  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList));
});

[{ description: "Curso de TS\n" }];

taskList.forEach((task) => {
  const taskElement = addTaks(task);
  ulTasks.appendChild(taskElement);
});
