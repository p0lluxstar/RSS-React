import styles from '../styles/Loader.module.css';

export default function Loader(): JSX.Element {
  return (
    <div className={styles.loadingWrapper}>
      <p className={styles.loading} data-testid="loader"></p>
    </div>
  );
}
