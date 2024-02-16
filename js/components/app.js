import { createStateInstance } from '../state.js';
import { render } from '../render.js';

import checkList from './checkList.js';


const app = () => {
  const div = document.createElement('div');
  div.classList.add('container');
  div.innerHTML = `
    <h1 class='capture'>Чек листы</h1>
    <nav class='navigation'>
      <ul class='navigation__list js-filter'>
        <li class='navigation__list-item' data-type='all'>Все задачи</li>
        <li class='navigation__list-item' data-type='active'>Активные</li>
        <li class='navigation__list-item' data-type='done'>Выполненные</li>
      </ul>
      <button class='btn navigation__btn js-create-list'>+ Добавить чек лист</button>
    </nav>
    <main>
      <ul class='check-lists'>
      </ul>
    </main>
  `;
  const ul = div.querySelector('.check-lists');

  div.querySelector('.js-filter').addEventListener('click', (e) => {
    console.log(e.target.dataset.type);
  });

  div.querySelector('.js-create-list').addEventListener('click', () => {
    createStateInstance.addCheckList();
  });

  createStateInstance.subscribe(() => {
    render(ul, checkList);
  });
  render(ul, checkList);

  return div;
};

export default app;
