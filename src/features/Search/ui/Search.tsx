import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import style from './Search.module.scss';
import { ErrorButton } from 'shared/lib/ui/ErrorButton';
import searchIcon from 'shared/assets/images/images/search.svg';
import { getLocalState, setLocalState } from 'shared/utils/localState';
import { useAppDispatch } from 'shared/lib/hooks';
import { setSearch } from 'entities/Search';
import { ToggleThemeButton } from 'shared/lib/ui/ToggleThemeButton';
import Image from 'next/image';

export const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const [submitValue, setSubmitValue] = useState<string>();
  const dispatch = useAppDispatch();

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
    dispatch(setSearch(submitValue));
  }, [submitValue]);

  useEffect(() => {
    const search: string | undefined = getLocalState('search');
    if (search) {
      setValue(search);
      dispatch(setSearch(search));
    }
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
        <Image src={searchIcon} alt="search" width={30} height={30} />
      </button>
    </form>
  );
};
