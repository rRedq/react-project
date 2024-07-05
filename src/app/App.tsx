import { Component, ReactNode } from 'react';
import { AppProps, CategoriesType, RacesResponse } from 'shared/types';
import { getData } from 'shared/lib/api';
import './styles/global.scss';
import { CategoriesList } from 'features/CategoriesList';
import { Header } from 'widgets/Header';
import { Search } from 'features/Search';
import { CardList } from 'widgets/CardList';
import style from './styles/App.module.scss';

export class App extends Component {
  state: AppProps = {
    data: null,
    isLoading: false,
    category: 'species',
  };

  updateCategory = async (category: CategoriesType): Promise<void> => {
    if (this.state.category === category) return;
    this.setState({ category });
    const data: RacesResponse[] = (await getData(this.state.search, category))
      .results;
    this.setState({ data });
  };

  updateSearch = async (search: string): Promise<void> => {
    if (this.state.search === search) return;
    this.setState({ search });
    const data: RacesResponse[] = (await getData(search, this.state.category))
      .results;
    this.setState({ data });
  };

  async componentDidMount(): Promise<void> {
    const { search, category } = this.state;
    const data: RacesResponse[] = (await getData(search, category)).results;
    this.setState({ data });
  }

  render(): ReactNode {
    return (
      <div className={`${style.app} ${style[this.state.category]}`}>
        <Header />
        <CategoriesList
          updateCategory={this.updateCategory}
          activeCategory={this.state.category}
        />
        <Search updateSearch={this.updateSearch} />
        {this.state.data && <CardList data={this.state.data} />}
      </div>
    );
  }
}
