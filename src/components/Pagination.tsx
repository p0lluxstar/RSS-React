import styles from './Pagination.module.css';

const Pagination = () => {
  return (
    <>
      <div className={styles.pagination}>
        <span>❮</span>
        <a className={styles.active} href="#">
          1
        </a>
        <a href="#">2</a>
        <a href="#">3</a>
        <span>❯</span>
      </div>
    </>
  );
};

export default Pagination;
