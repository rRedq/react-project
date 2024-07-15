import { FC, useEffect, useMemo, useState } from 'react';
import style from './CardDetails.module.scss';
import { useSearchParams } from 'react-router-dom';
import {
  getSearchParamsByKey,
  setSearchParamsByKey,
} from 'shared/utils/searchParams';
import { getDetailsData } from 'shared/lib/api';
import { CategoriesType, CombinedTypeDetails } from 'shared/types';
import { Spinner } from 'shared/lib/ui/Spinner';

export interface CardDetailsProps {
  card: string;
  category: CategoriesType;
}

export const CardDetails: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCard, setCurrentCard] = useState<CombinedTypeDetails>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = getSearchParamsByKey('DETAILS', searchParams);
    const parse = params?.split('/');
    if (!parse) return;
    const categoryIndex = 0;
    const cardIndex = 1;
    const category = parse[categoryIndex] as CategoriesType;
    const card = parse[cardIndex];
    getDetails({ card, category });
  }, [getSearchParamsByKey('DETAILS', searchParams)]);

  const getDetails = async (data: CardDetailsProps) => {
    try {
      setIsLoading(true);
      const { card, category } = data;

      const result = await getDetailsData({ card, category });
      setCurrentCard(result);
    } catch {
      closeDetails();
    } finally {
      setIsLoading(false);
    }
  };

  const memoDetails = useMemo(() => {
    if (!currentCard) return;
    const keys: string[] = Object.keys(currentCard);
    keys.splice(keys.indexOf('url'), 1);
    const value: string[] = Object.values(currentCard);
    return (
      <div className={style.container}>
        {keys.map((key, index) => (
          <p key={index}>
            <span>{key.split('_').join(' ')}: </span>
            {value[index]}
          </p>
        ))}
      </div>
    );
  }, [currentCard]);

  const closeDetails = () => {
    const props = setSearchParamsByKey('DETAILS', undefined, searchParams);
    setSearchParams(props);
  };

  return (
    <div
      className={style.cover}
      data-testid="details"
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={style.wrapper}>
          <div
            className={style.close}
            onClick={closeDetails}
            data-testid="close"
          ></div>
          {memoDetails}
        </div>
      )}
    </div>
  );
};
