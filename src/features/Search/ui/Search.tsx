import { ChangeEvent, FC, FormEvent, useState } from 'react';
import style from './Search.module.scss';
import { ErrorButton } from 'shared/lib/ui/ErrorButton';
import searchIcon from 'shared/assets/images/images/search.svg';
import { getLocalState } from 'shared/lib/localState';
import { useMount } from 'shared/lib/hooks';

interface SearchProps {
  updateSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ updateSearch }) => {
  const [value, setValue] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateSearch(value);
  };

  const crossClick = (): void => {
    setValue('');
    updateSearch('');
  };

  useMount(() => {
    const storedValue: string | undefined = getLocalState('search');
    if (storedValue) setValue(storedValue);
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
