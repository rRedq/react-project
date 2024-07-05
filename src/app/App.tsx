import React from 'react';
import { AppProps, RacesResponse } from 'shared/types';
import { getData } from 'shared/lib/api';
import { Context } from 'shared/lib/context/context';
import './styles/global.scss';
import { CategoriesList } from 'features/CategoriesList';
import { Header } from 'widgets/Header';
import { Search } from 'features/Search';
import { CardList } from 'widgets/CardList';

export class App extends React.Component {
  updateValue = (value: RacesResponse[] | null): void => {
    this.setState({ ...this.state, data: value });
  };

  state: AppProps = {
    data: null,
    isLoading: false,
    updateValue: this.updateValue,
  };

  async componentDidMount(): Promise<void> {
    const data: RacesResponse[] = (await getData()).results;

    this.setState({ data });
  }

  render(): React.ReactNode {
    return (
      <div>
        <Context.Provider value={this.state}>
          <Header />
          <CategoriesList />
          <Search />
          <CardList />
        </Context.Provider>
      </div>
    );
  }
}
