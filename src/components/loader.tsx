import styles from '../styles/Loader.module.css';

export default function Loader(): JSX.Element {
  return <p className={styles.loading} data-testid="loader"></p>;
}
