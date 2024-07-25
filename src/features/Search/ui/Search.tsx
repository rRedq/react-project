import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import style from './Search.module.scss';
import { ErrorButton } from 'shared/lib/ui/ErrorButton';
import searchIcon from 'shared/assets/images/images/search.svg';
import { getLocalState, setLocalState } from 'shared/utils/localState';
import { useAppDispatch, useAppSearchParams } from 'shared/lib/hooks';
import { setSearch } from 'entities/Search';
import { DEFAULT_PAGE } from 'shared/consts';
import { ToggleThemeButton } from 'shared/lib/ui/ToggleThemeButton';

export const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string>();
  const dispatch = useAppDispatch();
  const { setSearchParamsByKey } = useAppSearchParams();

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
    setSearchParamsByKey('PAGE', DEFAULT_PAGE);
    dispatch(setSearch(submitValue));
  }, [submitValue]);

  useEffect(() => {
    const getValue: string | undefined = getLocalState('search');
    if (getValue) setValue(getValue);
  }, []);

  return (
    <form className={style.searchForm} onSubmit={onSubmit}>
      <ErrorButton />
      <ToggleThemeButton />
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
