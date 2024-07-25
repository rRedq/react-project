import '@testing-library/jest-dom';
import { vi } from 'vitest';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});
