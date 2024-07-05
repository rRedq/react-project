import { Component, ReactNode } from 'react';
import { AppProps, CategoriesType, CombinedType } from 'shared/types';
import { getData } from 'shared/lib/api';
import './styles/global.scss';
import { CategoriesList } from 'features/CategoriesList';
import { Header } from 'widgets/Header';
import { Search } from 'features/Search';
import { CardList } from 'widgets/CardList';
import style from './styles/App.module.scss';
import { getLocalState, setLocalState } from 'shared/lib/localState';

export class App extends Component {
  state: AppProps = {
    data: null,
    isLoading: false,
    category: 'species',
  };

  updateData = async (): Promise<void> => {
    const { search, category } = this.state;
    const data: CombinedType = await getData(search, category);
    this.setState({ data, isLoading: false });
  };

  updateCategory = (category: CategoriesType): void => {
    if (this.state.category === category || this.state.isLoading) return;
    setLocalState('category', category);
    this.setState({ isLoading: true, category }, () => this.updateData());
  };

  updateSearch = (search: string): void => {
    if (this.state.search === search || this.state.isLoading) return;
    setLocalState('search', search);
    this.setState({ isLoading: true, search }, () => this.updateData());
  };

  componentDidMount(): void {
    const search: string | void = getLocalState('search');
    const category: string | void = getLocalState('category');
    this.setState({ search, category }, () => this.updateData());
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
