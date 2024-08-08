import '@testing-library/jest-dom';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { vi } from 'vitest';

beforeAll(() => {
  vi.mock('next/navigation', async (importOriginal) => {
    const actual = await importOriginal<typeof import('next/navigation')>();
    const { useRouter } =
      await vi.importActual<typeof import('next-router-mock')>(
        'next-router-mock'
      );
    const usePathname = vi.fn().mockImplementation(() => {
      return `/${DEFAULT_CATEGORY}`;
    });
    return {
      ...actual,
      useRouter: vi.fn().mockImplementation(useRouter),
      usePathname,
    };
  });
});
