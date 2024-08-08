'use client';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import style from './Search.module.scss';
import searchIcon from 'shared/assets/images/images/search.svg';
import { getLocalState, setLocalState } from 'shared/utils/localState';
import { useAppSearchParams } from 'shared/lib/hooks';
import { ToggleThemeButton } from 'shared/lib/ui/ToggleThemeButton';
import Image from 'next/image';

export const Search: FC = () => {
  const [value, setValue] = useState<string>();
  const [submitValue, setSubmitValue] = useState<string>();
  const { setSearchParamsByKey, getSearchParamsByKey } = useAppSearchParams();
  const search = getSearchParamsByKey('SEARCH');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitValue(value);
  };

  const crossClick = () => {
    setValue(undefined);
    setSubmitValue(undefined);
  };

  useEffect(() => {
    if (search === value) return;
    setValue(search);
    setSubmitValue(search);
  }, [search]);

  useEffect(() => {
    setLocalState('search', submitValue || '');
    setSearchParamsByKey('SEARCH', submitValue);
  }, [submitValue]);

  useEffect(() => {
    const search: string | undefined = getLocalState('search');
    if (search) {
      setValue(search);
      setSearchParamsByKey('SEARCH', search);
    }
  }, []);

  return (
    <form className={style.searchForm} onSubmit={onSubmit}>
      <ToggleThemeButton />
      <div className={style.cover}>
        <input
          className={style.search}
          type="text"
          placeholder="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={value || ''}
        />
        {value && (
          <div className={style.cross} onClick={crossClick}>
            X
          </div>
        )}
      </div>
      <button className={style.btn} type="submit">
        <Image src={searchIcon} alt="search" width={30} height={30} />
      </button>
    </form>
  );
};
