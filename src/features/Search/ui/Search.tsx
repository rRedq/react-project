import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import style from './Search.module.scss';
import { ErrorButton } from 'shared/lib/ui/ErrorButton';
import searchIcon from 'shared/assets/images/images/search.svg';
import { getLocalState } from 'shared/lib/localState';
interface SearchState {
  value: string;
}

interface SearchProps {
  updateSearch: (search: string) => void;
}

export class Search extends Component<SearchProps, SearchState> {
  updateSearch = this.props.updateSearch;
  state: SearchState = { value: '' };

  componentDidMount(): void {
    const value: string = getLocalState('search') || '';
    this.setState({ value });
  }

  onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.updateSearch(this.state.value);
  };

  crossClick = (): void => {
    this.setState({ value: '' }, () => this.updateSearch(this.state.value));
  };

  render(): ReactNode {
    const { value } = this.state;
    return (
      <form className={style.searchForm} onSubmit={this.onSubmit}>
        <ErrorButton />
        <div className={style.cover}>
          <input
            className={style.search}
            type="text"
            placeholder="search"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              this.setState({ value: e.target.value })
            }
            value={this.state.value}
          />
          {value && (
            <div className={style.cross} onClick={this.crossClick}>
              X
            </div>
          )}
        </div>

        <button className={style.btn} type="submit">
          <img src={searchIcon} />
        </button>
      </form>
    );
  }
}
