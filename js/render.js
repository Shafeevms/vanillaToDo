import { createdStateInstance } from './state.js';

/**
 * Рендерит элемент и добавляет его в целевой контейнер.
 * @param {HTMLElement} target - Целевой контейнер для добавления элемента.
 * @param {Function} component - Функция компонента, создающая элемент.
 * @param {string} id - Идентификатор элемента.
 */
export const renderElement = (target, component, id) => target.appendChild(component(id));

/**
 * Очищает целевой контейнер и рендерит все чек-листы.
 * @param {HTMLElement} target - Целевой контейнер для добавления элементов.
 * @param {Function} component - Функция компонента, создающая чек-лист.
 */
export const renderToDoList = (target, component) => {
  target.innerHTML = '';
  const state = createdStateInstance.getState();
  if (!Object.values(state).length) {
    return;
  }

  Object.values(state).forEach(todoList => {
    renderElement(target, component, todoList.id);
  });
};

/**
 * Очищает целевой контейнер и рендерит задачи чек-листа в соответствии с фильтром.
 * @param {HTMLElement} target - Целевой контейнер для добавления элементов.
 * @param {Function} component - Функция компонента, создающая задачу.
 * @param {string} id - Идентификатор чек-листа.
 * @param {string} view - Текущий фильтр задач (all, active, done).
 */
export const renderTask = (target, component, id, view) => {
  const state = createdStateInstance.getState();
  if (!(state[id])) {
    return;
  }

  target.innerHTML = '';

  /**
   * Функция рендеринга задачи, учитывающая фильтр.
   * @param {Object} todoList - Объект чек-листа.
   */
  const renderFilter = (todoList) => {
    const shouldRender = view === 'all' || (view === 'active' && !todoList.isDone) || (view === 'done' && todoList.isDone);
    if (shouldRender) {
      renderElement(target, component, todoList);
    }
  };

  Object.values(state[id].data).forEach(renderFilter);
};
