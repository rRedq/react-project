import { getData } from 'shared/lib/api';
import { BaseDataType, CategoriesType, SearchParams } from 'shared/types';
import { Main } from 'pages/Main/Main';
import { json } from '@remix-run/node';
import { VALID_CATEGORIES } from 'shared/consts';

export const loader = async ({
  request,
  params,
}: {
  request: Request;
  params: { category: CategoriesType };
}) => {
  try {
    const category = params[SearchParams.CATEGORY];

    if (!VALID_CATEGORIES.includes(category)) {
      throw new Error('Invalid category');
    }
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get(SearchParams.PAGE) || undefined;
    const search = searchParams.get(SearchParams.SEARCH) || undefined;
    const result: BaseDataType = await getData({ category, page, search });
    return json(result);
  } catch {
    throw new Response(null, { status: 404 });
  }
};

const MainPage = () => {
  return <Main />;
};

export default MainPage;
