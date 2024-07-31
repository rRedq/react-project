import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from 'pages/[category]/[[...details]]';
import {
  resultWithOneItem,
  testItemPlanetsResponse,
} from 'shared/lib/__mock__/data';
import { getData, getDetailsData } from 'shared/lib/api';
import { vi } from 'vitest';

vi.mock('shared/lib/api', () => ({
  getData: vi.fn(),
  getDetailsData: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('testing getServerSideProps', () => {
  it('testing redirect to page 404 if category is invalid', async () => {
    const context = {
      query: { category: 'invalid-category' },
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(getData).not.toHaveBeenCalled();
    expect(getDetailsData).not.toHaveBeenCalled();

    expect(result).toEqual({
      redirect: { destination: '/404', permanent: false },
    });
  });
  it('testing return data and details', async () => {
    const context = {
      query: {
        category: 'species',
        page: '1',
        details: ['1'],
      },
    } as unknown as GetServerSidePropsContext;

    vi.mocked(getData).mockResolvedValue(resultWithOneItem);
    vi.mocked(getDetailsData).mockResolvedValue(testItemPlanetsResponse);

    const result = await getServerSideProps(context);

    expect(getData).toHaveBeenCalledTimes(1);
    expect(getData).toHaveBeenCalledWith({ category: 'species', page: '1' });

    expect(getDetailsData).toHaveBeenCalledTimes(1);
    expect(getDetailsData).toHaveBeenCalledWith({
      category: 'species',
      card: '1',
    });

    expect(result).toEqual({
      props: {
        data: resultWithOneItem,
        details: testItemPlanetsResponse,
      },
    });
  });
  it('testing return data without details', async () => {
    const context = {
      query: {
        category: 'species',
      },
    } as unknown as GetServerSidePropsContext;

    vi.mocked(getData).mockResolvedValue(resultWithOneItem);

    const result = await getServerSideProps(context);

    expect(getData).toHaveBeenCalledTimes(1);
    expect(getData).toHaveBeenCalledWith({ category: 'species' });

    expect(getDetailsData).not.toHaveBeenCalled();

    expect(result).toEqual({
      props: {
        data: resultWithOneItem,
        details: null,
      },
    });
  });
});
