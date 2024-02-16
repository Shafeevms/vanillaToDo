import { createStateInstance } from './state.js';

export const renderElement = (target, component, id) => target.appendChild(component(id));

export const render = (target, component, id) => {
  target.innerHTML = '';
  const state = createStateInstance.getState();
  if (!Object.values(state).length) {
    return;
  }

  Object.values(state).forEach(todoList => {
    renderElement(target, component, todoList.id);
  });
};

export const renderTask = (target, component, id) => {
  target.innerHTML = '';
  const state = createStateInstance.getState();
  if (!(state[id])) {
    return;
  }
  Object.values(state[id].data).forEach(todoList => {
    renderElement(target, component, todoList);
  });
};
