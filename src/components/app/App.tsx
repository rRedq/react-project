import React from 'react';
import { AppProps, RacesResponse } from '../../shared/types';
import { getData } from '../../shared/lib/api';
import { Context } from '../../shared/lib/context/context';
import { CardList } from '../сard-list/CardList';
import './global.scss';
import { Header } from '../header/Header';

export class App extends React.Component {
  updatePlanets = (value: RacesResponse[] | null): void => {
    this.setState({ data: value });
  };

  state: AppProps = {
    data: null,
    isLoading: false,
    updatePlanets: this.updatePlanets,
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
          <CardList />
        </Context.Provider>
      </div>
    );
  }
}
