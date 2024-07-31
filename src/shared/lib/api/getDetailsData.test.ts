import { CategoriesType, CombinedTypeDetails } from 'shared/types';
import axios from 'axios';
import { vi } from 'vitest';
import { getDetailsData } from './getDetailsData';
import { testItemStarshipResponse } from '../__mock__';

vi.mock('axios');

const card = '12';
const category: CategoriesType = 'starships';

describe('testing getDetailsData', () => {
  it('testing success response', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: testItemStarshipResponse,
      status: 200,
    });

    const result: CombinedTypeDetails = await getDetailsData({
      card,
      category,
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(testItemStarshipResponse);
  });
  it('testing error response', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      status: 404,
    });

    try {
      await getDetailsData({
        card,
        category,
      });
    } catch (error) {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect((error as Error).message).toBe(
        'something went wrong during getting data'
      );
    }
  });
});
