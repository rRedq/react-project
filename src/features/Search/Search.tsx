import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import style from './Search.module.scss';
import { Context } from '../../shared/lib/context/context';
import { AppProps, RacesResponse } from '../../shared/types';
import { getData } from '../../shared/lib/api';

interface SearchProps {
  value: string;
}

export class Search extends Component {
  state: SearchProps = { value: '' };

  onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    updateValue: (value: RacesResponse[] | null) => void
  ): Promise<void> => {
    e.preventDefault();
    const result: RacesResponse[] = (await getData(this.state.value)).results;
    updateValue(result);
  };

  render(): ReactNode {
    return (
      <Context.Consumer>
        {({ updateValue }: AppProps) =>
          updateValue && (
            <form
              className={style.searchForm}
              onSubmit={(e: FormEvent<HTMLFormElement>) =>
                this.onSubmit(e, updateValue)
              }
            >
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
          )
        }
      </Context.Consumer>
    );
  }
}
