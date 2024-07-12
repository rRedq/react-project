import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import style from './Search.module.scss';
import { ErrorButton } from 'shared/lib/ui/ErrorButton';
import searchIcon from 'shared/assets/images/images/search.svg';
import { getLocalState, setLocalState } from 'shared/utils/localState';
import { useMount, useUnmount } from 'shared/lib/hooks';
import { setSearchParamsByKey } from 'shared/utils/searchParams';
import { useSearchParams } from 'react-router-dom';

export const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string>();
  const storedValue = useRef<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitValue(value);
  };

  useEffect(() => {
    if (submitValue === undefined) return;
    storedValue.current = submitValue;
    const params = setSearchParamsByKey('SEARCH', value, searchParams);
    setSearchParams(params);
    saveValueToLS();
  }, [submitValue]);

  const crossClick = () => {
    setValue('');
    setSubmitValue('');
  };

  const saveValueToLS = () => {
    setLocalState('search', storedValue.current);
  };

  useUnmount(() => {
    saveValueToLS();
  });

  useMount(() => {
    const getValue: string | undefined = getLocalState('search');
    if (getValue) setValue(getValue);
    storedValue.current = getValue || '';
  });

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
