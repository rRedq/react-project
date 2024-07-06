import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import style from './Search.module.scss';
import { ErrorButton } from 'shared/lib/ui/ErrorButton';

interface SearchState {
  value: string;
}

interface SearchProps {
  updateSearch: (search: string) => void;
}

export class Search extends Component<SearchProps, SearchState> {
  updateSearch = this.props.updateSearch;
  state: SearchState = { value: '' };

  onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.updateSearch(this.state.value);
  };

  render(): ReactNode {
    return (
      <form className={style.searchForm} onSubmit={this.onSubmit}>
        <ErrorButton />
        <input
          className={style.search}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.setState({ value: e.target.value })
          }
          value={this.state.value}
        />
        <input type="submit" />
      </form>
    );
  }
}
