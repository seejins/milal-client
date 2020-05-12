import React from 'react';
import ReactDOM from 'react-dom';
import VolunteerMain from './VolunteerMain';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <VolunteerMain />
    </BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});