import { nanoid } from 'nanoid';

export const state = {};

export const addCheckList = () => {
  const id = nanoid();
  state[id] = {
    id,
    name: `Новый чек лист`,
    data: [],
  };

  return id;
};

export const addTask = (checkListId, title, text) => {
  const id = nanoid();
  const newTask = {
    checkListId,
    id,
    title,
    text,
    isDone: false,
  }
  state[checkListId].data.push(newTask) ;

  return newTask;
};
