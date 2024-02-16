import { nanoid } from 'nanoid';

/**
 * Создает новую задачу.
 * @param {string} checkListId - Идентификатор чек-листа.
 * @param {string} title - Название задачи.
 * @param {string} text - Описание задачи.
 * @returns {Object} - Созданная задача.
 */
const createTask = (checkListId, title, text) => ({
  checkListId,
  id: nanoid(),
  title,
  text,
  isDone: false,
});

/**
 * Создает и возвращает объект состояния приложения.
 * @returns {Object} - Объект состояния приложения.
 */
const createState = () => {
  /** @type {Array<Function>} - Массив функций-наблюдателей за изменениями состояния. */
  const observers = [];

  /**
   * Текущее состояние приложения.
   * @type {Object}
   */
  let internalState = {
    '2342': {
      id: '2342',
      name: 'тестовый чек лист',
      data: [
        createTask('2342', 'first TODO', 'first todo'),
        createTask('2342', 'second TODO', 'second todo'),
      ],
    },
  };

  /** @type {string} - Текущий фильтр для отображения задач (все, активные, выполненные). */
  let filterView = 'all';

  /**
   * Оповещает все функции-наблюдатели о изменениях в internalState.
   * @private
   */
  const notifyObservers = () => {
    observers.forEach(observer => observer(internalState));
  };

  /**
   * Изменяет текущий фильтр и оповещает наблюдателей.
   * @param {string} filter - Новый фильтр (all, active, done).
   */
  const changeView = (filter) => {
    filterView = filter;
    console.log(filterView);
    notifyObservers();
  };

  /**
   * Добавляет новый чек-лист и оповещает наблюдателей.
   * @returns {string} - Идентификатор нового чек-листа.
   */
  const addCheckList = () => {
    const id = nanoid();
    internalState[id] = {
      id,
      name: `Новый чек лист`,
      data: [],
    };
    notifyObservers();
    return id;
  };

  /**
   * Удаляет чек-лист по его идентификатору и оповещает наблюдателей.
   * @param {string} id - Идентификатор чек-листа.
   */
  const removeCheckList = (id) => {
    delete internalState[id];
    notifyObservers();
  };

  /**
   * Изменяет название чек-листа и оповещает наблюдателей.
   * @param {string} id - Идентификатор чек-листа.
   * @param {string} newName - Новое название чек-листа.
   */
  const changeTitle = (id, newName) => {
    internalState[id].name = newName;
    notifyObservers();
  };

  /**
   * Добавляет новую задачу в чек-лист и оповещает наблюдателей.
   * @param {string} checkListId - Идентификатор чек-листа.
   * @param {string} title - Название задачи.
   * @param {string} text - Описание задачи.
   * @returns {Object} - Созданная задача.
   */
  const addTask = (checkListId, title, text) => {
    const newTask = createTask(checkListId, title, text);
    internalState[checkListId].data.push(newTask);
    notifyObservers();
    return newTask;
  };

  /**
   * Удаляет задачу из чек-листа и оповещает наблюдателей.
   * @param {string} checkListId - Идентификатор чек-листа.
   * @param {string} taskId - Идентификатор задачи.
   */
  const removeTask = (checkListId, taskId) => {
    const taskIndex = internalState[checkListId].data.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      internalState[checkListId].data.splice(taskIndex, 1);
    }
    notifyObservers();
  };

  /**
   * Добавляет функцию-наблюдатель в массив observers.
   * @param {Function} observer - Функция-наблюдатель.
   */
  const subscribe = (observer) => {
    observers.push(observer);
  };

  // Возвращаемый объект представляет собой интерфейс для взаимодействия с состоянием приложения.
  return {
    /**
     * Получает текущий фильтр для отображения задач.
     * @returns {string} - Текущий фильтр (all, active, done).
     */
    getView: () => filterView,
    changeView,
    /**
     * Получает текущее состояние приложения.
     * @returns {Object} - Объект состояния приложения.
     */
    getState: () => internalState,
    addCheckList,
    removeCheckList,
    changeTitle,
    addTask,
    removeTask,
    subscribe,
    notifyObservers,
  };
};

export const createdStateInstance = createState();
