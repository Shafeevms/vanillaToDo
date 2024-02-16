import { createStateInstance } from '../state.js';


const taskLine = ({ id, title, text, isDone, checkListId }) => {
  const li = document.createElement('li');
  li.dataset.id = id;
  li.classList.add('list__item');
  li.innerHTML = `
    <div class='list__item-wrapper'>
      <h3 class='list__title'>${title}</h3>
      <p class='list__text ${isDone ? 'list__text_done' : ''}'>${text}</p>
    </div>
    <button class='btn list__btn-done js-done'>!@#</button>
    <button class='btn list__btn-del js-del'>!@#</button>
  `;

  const textElement = li.querySelector('.list__text');

  li.querySelector('.js-done').addEventListener('click', () => {
    const task = createStateInstance.getState()[checkListId].data.find(el => el.id === id);
    if (task) {
      task.isDone = !task.isDone;
      createStateInstance.notifyObservers();
    }
  });

  li.querySelector('.js-del').addEventListener('click', () => {
    createStateInstance.removeTask(checkListId, id);
  });

  return li;
}

export default taskLine;
