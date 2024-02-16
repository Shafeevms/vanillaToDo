import 'reset-css';
import './style.scss';

import app from './js/components/app.js';

(() => {
  document.getElementById('app').appendChild(app());
})();
