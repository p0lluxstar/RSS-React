/* import styles from './NotFoundPage.module.css'; */
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <>
      <div className={'not_found'}>
        <span>Error 404. Page Not Found</span>
        <Link href="/">Main page</Link>
      </div>
    </>
  );
};
export default NotFoundPage;
