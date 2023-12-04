import styles from './DataUserOnPage.module.css';
import { DataUserOnpage } from '../types/interfaces';

const DataUserOnPage = (props: DataUserOnpage) => {
  console.log(props);
  return (
    <>
      <div className={styles['data-user']}>
        <h3>{props.title}</h3>
        <p>Name: {props.name}</p>
        <p>Age: {props.age}</p>
        <p>Email: {props.email}</p>
        <p>Password: {props.password}</p>
        <img src={props.img} alt="Picture" />
      </div>
    </>
  );
};

export default DataUserOnPage;
