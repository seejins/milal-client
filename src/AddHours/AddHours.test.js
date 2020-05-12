import React from 'react';
import ReactDOM from 'react-dom';
import AddHours from './AddHours';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <AddHours />
    </BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});