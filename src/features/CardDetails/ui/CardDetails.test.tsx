import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardDetails } from './CardDetails';

const searchPath = '/?details=species%2F1';

Object.defineProperty(window, 'location', {
  value: {
    search: searchPath,
  },
  writable: true,
});

test('testing CardDetails', () => {
  render(
    <BrowserRouter>
      <CardDetails />
    </BrowserRouter>
  );

  expect(location.search).toBe(searchPath);
});
