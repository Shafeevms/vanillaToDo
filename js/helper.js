import checkList from './components/checkList.js';

export const renderElement = (target, component, id) => target.appendChild(component(id));
