import styles from './Pagination.module.css';
import './Pagination.css';
import { NavLink } from 'react-router-dom';
import { DEFAULT_QUANTITY_OFFSET_POKEMONS } from '../const/const';

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

  function countingItemPagination(numItemPagination: {
    currentTarget: { innerHTML: unknown };
  }) {
    const numItemPagePagination = Number(
      numItemPagination.currentTarget.innerHTML
    );
    localStorage.setItem('numPaginationPage', `${numItemPagePagination}`);
    props.clickOnItemPagination(
      (numItemPagePagination - 1) * DEFAULT_QUANTITY_OFFSET_POKEMONS
    );
  }

  function creatItemPagination() {
    return (
      <>
        {!(currentPages.length === 1) &&
          currentPages.map((numPage) => {
            return (
              <NavLink
                to={`/${numPage}`}
                key={numPage}
                onClick={countingItemPagination}
                end
              >
                {numPage}
              </NavLink>
            );
          })}
      </>
    );
  }

  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.current_element}>{`${
          numPaginationPageFromLocalStorage * DEFAULT_QUANTITY_OFFSET_POKEMONS -
          19
        } to ${
          numPaginationPageFromLocalStorage * DEFAULT_QUANTITY_OFFSET_POKEMONS
        }`}</div>
        <div className={styles.pagination_item}>{creatItemPagination()}</div>
      </div>
    </>
  );
};

export default Pagination;
