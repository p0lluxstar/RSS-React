/* import styles from './Pagination.module.css'; */
/* import './Pagination.css'; */
import { DEFAULT_QUANTITY_OFFSET_POKEMONS } from '../const/const';
import Link from 'next/link';

interface Current {
  currentAllPokemons: number;
  clickOnItemPagination(arg: number): void;
}

const Pagination = (props: Current) => {
  const maxItemPaginatin =
    props.currentAllPokemons / DEFAULT_QUANTITY_OFFSET_POKEMONS;
  const numPaginationPageFromLocalStorage = Number(
    localStorage.getItem('numPaginationPage')
  );

  const currentPages: Array<number> = [];
  for (let i = 0; i < maxItemPaginatin; i++) {
    currentPages.push(i + 1);
  }

  function creatItemPagination() {
    return (
      <>
        {!(currentPages.length === 1) &&
          currentPages.map((numPage) => {
            return <Link href={`/${numPage}`}>{numPage}</Link>;
          })}
      </>
    );
  }

  return (
    <>
      <div className={'pagination'}>
        <div className={'current_element'}>{`${
          numPaginationPageFromLocalStorage * DEFAULT_QUANTITY_OFFSET_POKEMONS -
          19
        } to ${
          numPaginationPageFromLocalStorage * DEFAULT_QUANTITY_OFFSET_POKEMONS
        }`}</div>
        <div className={'pagination_item'}>{creatItemPagination()}</div>
      </div>
    </>
  );
};

export default Pagination;
