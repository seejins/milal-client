import React from 'react';
import ReactDOM from 'react-dom';
import AddVolunteer from './AddVolunteer';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <AddVolunteer />
    </BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});