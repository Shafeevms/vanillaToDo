import doneIcon from '../../public/done.svg';
import delIcon from '../../public/del.svg';
import { createdStateInstance } from '../state.js';


const taskLine = ({ id, title, text, isDone, checkListId }) => {
  const li = document.createElement('li');
  li.dataset.id = id;
  li.classList.add('list__item');
  li.innerHTML = `
    <div class='list__item-wrapper'>
      <h3 class='list__title'>${title}</h3>
      <p class='list__text ${isDone ? 'list__text_done' : ''}'>${text}</p>
    </div>
    <button class='btn list__btn-done js-done'>
       <img src='${doneIcon}' alt='done' class='icon'/>
    </button>
    <button class='btn btn-red list__btn-del js-del'>
      <img src='${delIcon}' alt='done' class='icon'/>
    </button>
  `;

  const textElement = li.querySelector('.list__text');

  li.querySelector('.js-done').addEventListener('click', () => {
    const task = createdStateInstance.getState()[checkListId].data.find(el => el.id === id);
    if (task) {
      task.isDone = !task.isDone;
      createdStateInstance.notifyObservers();
    }
  });

  li.querySelector('.js-del').addEventListener('click', () => {
    createdStateInstance.removeTask(checkListId, id);
  });

  return li;
}

export default taskLine;
