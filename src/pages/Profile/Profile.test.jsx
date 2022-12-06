import * as React from 'react';
import { renderWithRouter } from 'test';
import { screen } from '@testing-library/react';

import { enLanguage } from 'translations';
import { Profile } from './Profile';

const render = () => renderWithRouter(<Profile />);

describe('Profile', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should show children', () => {
    render();

    expect(screen.getByText(enLanguage.profile_title)).toBeVisible();
  });
});
