import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
// import MarvelService from './services/MarvelService';

import './style/style.scss';

// let marvelService = new MarvelService();
// marvelService.getCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000)).then(res => console.log(res));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

