import { createdStateInstance } from '../state.js';
import { renderToDoList } from '../render.js';

import checkList from './checkList.js';


const app = () => {
  const div = document.createElement('div');
  div.classList.add('container');
  div.innerHTML = `
    <h1 class='capture'>Чек листы</h1>
    <nav class='navigation'>
      <ul class='navigation__list js-filter'>
        <li class='navigation__list-item navigation__list-item_selected' data-type='all'>Все задачи</li>
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
  const filterItems = div.querySelectorAll('.js-filter li');

  const updateFilterHighlight = (selectedType) => {
    filterItems.forEach(item => {
      item.classList.toggle('navigation__list-item_selected', item.dataset.type === selectedType);
    });
  };

  div.querySelector('.js-filter').addEventListener('click', (e) => {
    const filterType = e.target.dataset.type;
    createdStateInstance.changeView(filterType);
    updateFilterHighlight(filterType);
  });

  div.querySelector('.js-create-list').addEventListener('click', () => {
    createdStateInstance.addCheckList();
  });

  createdStateInstance.subscribe(() => {
    renderToDoList(ul, checkList);
  });
  renderToDoList(ul, checkList);

  return div;
};

export default app;
