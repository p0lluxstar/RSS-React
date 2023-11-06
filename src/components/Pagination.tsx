import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.css';
import './Pagination.css';

interface Current {
  currentAllPokemons: number;
  clickOnItemPagination(arg: number): void;
}

const Pagination = (props: Current) => {
  const currnPokemoOnPage = 20;
  const maxItemPaginatin = props.currentAllPokemons / currnPokemoOnPage;

  const currentPages: Array<number> = [];
  for (let i = 0; i < maxItemPaginatin; i++) {
    currentPages.push(i + 1);
  }

  function countingItemPagination(numItemPagination: {
    currentTarget: { innerHTML: unknown };
  }) {
    props.clickOnItemPagination(
      Number(numItemPagination.currentTarget.innerHTML) * currnPokemoOnPage -
        currnPokemoOnPage
    );
  }

  function creatItemPagination() {
    return (
      <>
        {currentPages.map((numPage) => {
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
      <div className={styles.pagination}>{creatItemPagination()}</div>
    </>
  );
};

export default Pagination;
