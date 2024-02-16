import pen from '../../public/pen.svg'
import { createdStateInstance } from '../state.js';
import { renderElement, renderTask } from '../render.js';

import modal from './modal.js';
import taskLine from './taskLine.js';


const checkList = (id) => {
  const state = createdStateInstance.getState();
  const { name } = state[id];
  const li = document.createElement('li');
  li.dataset.id = id;
  li.classList.add('check-list');
  li.innerHTML = `
    <header class='check-list__header'>
                <h2 class='check-list__title js-list-title'>${name}</h2>
                <button class='btn check-list__button-change js-change-title'>
                  <img src='${pen}' alt="Pen Icon" class='icon'/>
                </button>
                <button class='btn btn-red check-list__button-delete js-button-delete'>Удалить чек лист</button>
    </header>
    <ul class='list js-list'>
    </ul>
    <button class='btn check-list__add-task'>+добавить пункт</button>
  `;

  const title = li.querySelector('.js-list-title');
  const ul = li.querySelector('.js-list');

  const view = createdStateInstance.getView();

  li.querySelector('.js-button-delete').addEventListener('click', () => {
    createdStateInstance.removeCheckList(id);
  });

  li.querySelector('.js-change-title').addEventListener('click', () => {
    title.setAttribute('contenteditable', 'true');
    title.focus();
  });

  li.querySelector('.check-list__add-task').addEventListener('click', () => {
    renderElement(document.body, modal, id);
    document.body.classList.add('modal_open');
  });

  title.addEventListener('blur', () => {
    createdStateInstance.changeTitle(id, title.innerText);
  });

  createdStateInstance.subscribe(() => {
    renderTask(ul, taskLine, id, view);
  });
  renderTask(ul, taskLine, id, view);

  return li;
};

export default checkList;
