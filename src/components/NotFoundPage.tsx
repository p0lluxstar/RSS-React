import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <>
      <div className={styles.not_found}>
        <span>Error 404. Page Not Found</span>
        <Link to="/">Main page</Link>
      </div>
    </>
  );
};
export default NotFoundPage;
