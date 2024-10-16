import { screen, render } from 'tests';

import { UpdateTodoForm } from './UpdateTodoForm';

describe('UpdateTodoForm', () => {
  it('renders children correctly', () => {
    render(
      <UpdateTodoForm>UpdateTodoForm</UpdateTodoForm>,
    );

    const element = screen.getByText('UpdateTodoForm');

    expect(element).toBeInTheDocument();
  });
});
