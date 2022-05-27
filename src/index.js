import { saveTask, onGetTask, deleteTask, getTask, updateTask } from "./firebase.js";

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');
let ediStatus = false;

window.addEventListener('DOMContentLoaded', async () => {
  onGetTask((querySnapShot) => {
    
    taskContainer.innerHTML = '';

    querySnapShot.forEach(doc => {
      const task = doc.data()
      taskContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${task.title}</h3>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}" >Delete</button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}" >Edit</button>
        </div>
      </div>
      `;
    })


    const btnsDelete = taskContainer.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      })
    })

    const btnsEdit = taskContainer.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();

        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description

        ediStatus = true;
        id = doc.id

        taskForm['btn-task-save'].innerHTML = 'Update';

      })

    })
  })
});


taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['task-title']
  const description = taskForm['task-description']
  if (!ediStatus) {
    saveTask(title.value, description.value);
  } else {
    updateTask(id, { title: title.value, description: description.value });
    ediStatus = false;
  }
  taskForm.reset()
})
