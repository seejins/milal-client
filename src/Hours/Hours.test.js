import React from 'react';
import ReactDOM from 'react-dom';
import Hours from './Hours';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Hours />
    </BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});