import { state } from '../state.js';

const taskLine = ({ id, title, text, isDone, checkListId }) => {
  const li = document.createElement('li');
  li.dataset.id = id;
  li.classList.add('list__item');
  li.innerHTML = `
    <div class='list__item-wrapper'>
      <h3 class='list__title'>${title}</h3>
      <p class='list__text'>${text}</p>
    </div>
    <button class='btn list__btn-done js-done'>!@#</button>
    <button class='btn list__btn-del js-del'>!@#</button>
  `;

  const textElement = li.querySelector('.list__text');

  li.querySelector('.js-done').addEventListener('click', () => {
    const task = state[checkListId].data.find(el => el.id === id);
    if (task) {
      task.isDone = !task.isDone;
      textElement.classList.toggle('list__text_done', task.isDone);
    }
  });

  li.querySelector('.js-del').addEventListener('click', () => {
    const taskIndex = state[checkListId].data.findIndex(el => el.id === id);
    if (taskIndex !== -1) {
      state[checkListId].data.splice(taskIndex, 1);
      li.remove();
    }
  });

  return li;
}

export default taskLine;
