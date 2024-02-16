import { state } from '../state.js';
import { renderElement } from '../helper.js';
import modal from './modal.js';

const checkList = (id) => {
  const li = document.createElement('li');
  li.dataset.id = id;
  li.classList.add('check-list');
  li.innerHTML = `
    <header class='check-list__header'>
                <h2 class='check-list__title js-list-title'>Чек лист</h2>
                <button class='btn check-list__button-change js-change-title'>!!!</button>
                <button class='btn check-list__button-delete js-button-delete'>Удалить чек лист</button>
    </header>
    <ul class='list js-list'>
    </ul>
    <button class='btn check-list__add-task'>+добавить пункт</button>
  `;

  const title = li.querySelector('.js-list-title');

  li.querySelector('.js-button-delete').addEventListener('click', () => {
    delete state[id];
    li.remove();
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
    state[id].name = title.innerText;
  })

  return li;
};

export default checkList;
