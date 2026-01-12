import styles from '../styles/DataUserOnPage.module.css';
import { IDataUserOnPage } from '../types/interfaces';

const DataUserOnPage = (props: IDataUserOnPage) => {
  return (
    <>
      <div className={styles.dataUser}>
        <p className={styles.userIndex}>User #{props.index}</p>
        <p>
          <span>Name:</span> {props.name}
        </p>
        <p>
          <span>Age:</span> {props.age}
        </p>
        <p>
          <span>Gender:</span> {props.gender}
        </p>
        <p>
          <span>Email:</span> {props.email}
        </p>
        <p>
          <span>Country:</span> {props.country}
        </p>
        <p>
          <span>Password:</span> {props.password}
        </p>
        <img src={props.file} alt="Picture" />
      </div>
    </>
  );
};

export default DataUserOnPage;
