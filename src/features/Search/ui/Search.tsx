import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import style from './Search.module.scss';
import { ErrorButton } from 'shared/lib/ui/ErrorButton';
import searchIcon from 'shared/assets/images/images/search.svg';
import { getLocalState, setLocalState } from 'shared/utils/localState';
import { useAppDispatch } from 'shared/lib/hooks';
import { setSearch } from 'app/entities/Search';
import { useSearchParams } from 'react-router-dom';
import { setSearchParamsByKey } from 'shared/utils/searchParams';
import { DEFAULT_PAGE } from 'shared/consts';

export const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string>();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitValue(value);
  };

  const crossClick = () => {
    setValue('');
    setSubmitValue('');
  };

  useEffect(() => {
    if (submitValue === undefined) return;
    setLocalState('search', submitValue);
    const result = setSearchParamsByKey('PAGE', DEFAULT_PAGE, searchParams);
    setSearchParams(result);
    dispatch(setSearch(submitValue));
  }, [submitValue]);

  useEffect(() => {
    const getValue: string | undefined = getLocalState('search');
    if (getValue) setValue(getValue);
  }, []);

  return (
    <form className={style.searchForm} onSubmit={onSubmit}>
      <ErrorButton />
      <div className={style.cover}>
        <input
          className={style.search}
          type="text"
          placeholder="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={value}
        />
        {value && (
          <div className={style.cross} onClick={crossClick}>
            X
          </div>
        )}
      </div>
      <button className={style.btn} type="submit">
        <img src={searchIcon} alt="search" />
      </button>
    </form>
  );
};
