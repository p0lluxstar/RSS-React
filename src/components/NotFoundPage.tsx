import styles from '../styles/NotFoundPage.module.css';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className={styles.notFoundPage} data-testid="notFoundPage">
      <span>Error 404. Page Not Found!</span>
    </div>
  );
}
