import { createdStateInstance } from '../state.js';


const modal = (id) => {
  const div = document.createElement('div');
  div.classList.add('modal');
  div.innerHTML = `
    <div class='modal__frame'>
      <h2 class='modal__title'>Создать задачу</h2>
      <input placeholder='Название задачи' type='text' class='input modal__input modal__input-title'>
      <input placeholder='Описание задачи' type='text' class='input modal__input modal__input-text'>
      <button class='btn modal__btn modal__btn-save'>Сохранить</button>
      <button class='btn modal__btn modal__btn-exit'>Выйти</button>
    </div>
  `;

  const title = div.querySelector('.modal__input-title');
  const description= div.querySelector('.modal__input-text');
  const btnSave= div.querySelector('.modal__btn-save');
  const btnExit = div.querySelector('.modal__btn-exit');

  btnSave.addEventListener('click', (e) => {
    const titleValue = title.value;
    const descriptionValue = description.value;
    createdStateInstance.addTask(id, titleValue, descriptionValue);
    document.body.classList.remove('modal_open');
    div.remove();
  });

  btnExit.addEventListener('click', (e) => {
    document.body.classList.remove('modal_open');
    div.remove();
  });

  return div;
}

export default modal;
