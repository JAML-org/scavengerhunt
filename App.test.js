import React from 'react';
import App from './App';
import UserSignUpForm from './components/UserSignUpForm';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<UserSignUpForm/>).toJSON();
  expect(rendered).toBeTruthy();
});
