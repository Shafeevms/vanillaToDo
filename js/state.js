import { nanoid } from 'nanoid';

const createState = () => {
  const observers = [];
  let internalState = {
    '2342': {
      id: '2342',
      name: 'тестовый чек лист',
      data: [
        {
          id: 'egoigpodgjos',
          title: 'first TODO',
          text: 'first todo',
          isDone: false,
          checkListId: '2342',
        },
        {
          id: 'lkngl',
          title: 'second TODO',
          text: 'second todo',
          isDone: true,
          checkListId: '2342',
        }
      ]
    }
  };

  const notifyObservers = () => {
    observers.forEach(observer => observer(internalState));
  };

  return {
    getState: () => internalState,
    addCheckList: () => {
      const id = nanoid();
      internalState[id] = {
        id,
        name: `Новый чек лист`,
        data: [],
      };
      notifyObservers();
      return id;
    },
    removeCheckList: (id) => {
      delete internalState[id];
      notifyObservers();
    },
    changeTitle: (id, newName) => {
      internalState[id].name = newName;
      notifyObservers();
    },
    addTask: (checkListId, title, text) => {
      const id = nanoid();
      const newTask = {
        checkListId,
        id,
        title,
        text,
        isDone: false,
      };
      internalState[checkListId].data.push(newTask);
      notifyObservers();
      return newTask;
    },
    removeTask: (checkListId, id) => {
      const taskIndex = internalState[checkListId].data.findIndex(el => el.id === id);
      if (taskIndex !== -1) {
        internalState[checkListId].data.splice(taskIndex, 1);
      }
      notifyObservers();
    },
    subscribe: (observer) => {
      observers.push(observer);
    },
    notifyObservers,
  };
};

export const createStateInstance = createState();
