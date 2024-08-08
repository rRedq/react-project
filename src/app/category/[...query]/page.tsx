import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { SelectController } from 'features/SelectController';
import { VALID_CATEGORIES } from 'shared/consts';
import { getData, getDetailsData } from 'shared/lib/api';
import {
  CategoriesType,
  BaseDataType,
  SearchParams,
  CombinedTypeDetails,
  Paths,
} from 'shared/types';
import style from './Category.module.scss';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import { CardDetails } from 'features/CardDetails';
import { redirect } from 'next/navigation';

const Category = async ({
  params: { query },
  searchParams,
}: {
  params: { query: [CategoriesType, string] | [CategoriesType] };
  searchParams?: { [key: string]: string };
}) => {
  try {
    const category = query[0];
    const details = query[1];
    if (!category || !VALID_CATEGORIES.includes(category)) {
      throw new Error('Invalid category');
    }

    const page = searchParams ? searchParams[SearchParams.PAGE] : undefined;
    const search = searchParams ? searchParams[SearchParams.SEARCH] : undefined;
    const data: BaseDataType = await getData({ category, page, search });

    let detailsData: CombinedTypeDetails | undefined;
    if (details)
      detailsData = await getDetailsData({ category, card: details });

    return (
      <div className={`${style.app} ${style[category]}`}>
        <Header />
        <CategoriesList />
        <Search />
        <SelectController />
        <CardList data={data}>
          {detailsData && <CardDetails data={detailsData} />}
        </CardList>
      </div>
    );
  } catch {
    redirect(Paths.NOT_FOUND);
  }
};

export default Category;
