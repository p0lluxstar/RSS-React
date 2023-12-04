import styles from './DataUserOnPage.module.css';
import { DataUserOnpage } from '../types/interfaces';

const DataUserOnPage = (props: DataUserOnpage) => {
  return (
    <>
      <div className={styles['data-user']}>
        <h3>{props.title}</h3>
        <p>Name: {props.name}</p>
        <p>Age: {props.age}</p>
        <p>Email: {props.email}</p>
        <p>Password: {props.password}</p>
      </div>
    </>
  );
};

export default DataUserOnPage;
