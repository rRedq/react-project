import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {
  BaseDataType,
  CategoriesType,
  CombinedTypeDetails,
  Paths,
  SearchParams,
} from 'shared/types';
import { getData, getDetailsData } from 'shared/lib/api';
import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { SelectController } from 'features/SelectController';
import { useAppSearchParams, useTheme } from 'shared/lib/hooks';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Category.module.scss';
import { CardDetails } from 'features/CardDetails';

export const getServerSideProps: GetServerSideProps<{
  data: BaseDataType;
  details: CombinedTypeDetails | null;
}> = async (context: GetServerSidePropsContext) => {
  try {
    const { query } = context;
    const category = query[SearchParams.CATEGORY] as CategoriesType;
    const categories: CategoriesType[] = ['species', 'starships', 'planets'];

    if (!categories.includes(category)) {
      throw new Error('Invalid category');
    }

    const page = (query[SearchParams.PAGE] as string) || undefined;
    const search = (query[SearchParams.SEARCH] as string) || undefined;
    const data: BaseDataType = await getData({ category, page, search });

    let card = query[SearchParams.DETAILS];
    let details: CombinedTypeDetails | null = null;
    if (card) {
      card = card[0];
      details = await getDetailsData({ category, card });
    }
    return { props: { data, details } };
  } catch {
    return {
      redirect: { destination: Paths.NOT_FOUND, permanent: false },
    };
  }
};

const Category = ({
  data,
  details,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { getSearchParamsByKey } = useAppSearchParams();
  const category = getSearchParamsByKey('CATEGORY');
  const { theme } = useTheme();

  return (
    <>
      {category && (
        <div className={`${style.app} ${style[category]}`} data-theme={theme}>
          <Header />
          <CategoriesList />
          <Search />
          <SelectController />
          <CardList data={data}>
            {details && <CardDetails data={details} />}
          </CardList>
        </div>
      )}
    </>
  );
};

export default Category;
