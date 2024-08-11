import { loader } from 'app/routes/home.$category';
import { loader as detailsLoader } from 'app/routes/home.$category.$details';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { testBaseData, testItemSpaceResponse } from 'shared/lib/__mock__';
import { getData, getDetailsData } from 'shared/lib/api';
import { CategoriesType, Paths } from 'shared/types';
import { vi } from 'vitest';

interface ResponseError extends Error {
  status?: number;
}

const baseUrl = 'http://localhost:5173';

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

vi.mock('shared/lib/api', () => ({
  getData: vi.fn(),
  getDetailsData: vi.fn(),
}));

describe('testing loaders', () => {
  describe('testing category loader', () => {
    it('testing category data loader success response', async () => {
      vi.mocked(getData).mockResolvedValue(testBaseData);

      const request = new Request(`${baseUrl}${Paths.MAIN}${DEFAULT_CATEGORY}`);
      const params = { category: DEFAULT_CATEGORY };
      const response = await loader({ request, params });

      const data = await (response as Response).json();

      expect(getData).toHaveBeenCalledTimes(1);
      expect(getData).toHaveBeenCalledWith(params);
      expect(data).toEqual(testBaseData);
    });
    it('testing category data loader reject', async () => {
      const invalidValue = 'invalidCategory' as CategoriesType;
      const request = new Request(`${baseUrl}${Paths.MAIN}${invalidValue}`);

      const params = { category: invalidValue };

      try {
        await loader({ request, params });
      } catch (error) {
        const err = error as ResponseError;
        expect(err.status).toBe(404);
      }
    });
  });
  describe('testing details loader', () => {
    it('testing details data loader success response', async () => {
      vi.mocked(getDetailsData).mockResolvedValue(testItemSpaceResponse);
      const card = '1';
      const params = { details: card };
      const response = await detailsLoader({ params });

      const data = await (response as Response).json();

      expect(getDetailsData).toHaveBeenCalledTimes(1);
      expect(getDetailsData).toHaveBeenCalledWith({
        category: DEFAULT_CATEGORY,
        card,
      });
      expect(data).toEqual(testItemSpaceResponse);
    });
    it('testing details data loader reject', async () => {
      vi.mocked(getDetailsData).mockRejectedValue({ status: 404 });

      const card = '999999999';
      const params = { details: card };

      try {
        await detailsLoader({ params });
      } catch (error) {
        const err = error as ResponseError;
        expect(err.status).toBe(404);
      }
    });
  });
});
