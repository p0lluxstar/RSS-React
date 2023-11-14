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
      numItemPagePagination * currnPokemoOnPage - currnPokemoOnPage
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
          numPaginationPageFromLocalStorage * 20 - 19
        } to ${numPaginationPageFromLocalStorage * 20}`}</div>
        <div className={styles.pagination_item}>{creatItemPagination()}</div>
      </div>
    </>
  );
};

export default Pagination;
