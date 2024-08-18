import styles from '../styles/Home.module.css';
import { useSelector } from 'react-redux';
import DataUserOnPage from './DataUserOnPage';
import { IDataForm } from '../types/interfaces';

const Home = () => {
  const dataUserFromStore = useSelector(
    (state: { dataForms: IDataForm[] }) => state.dataForms
  );

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      {dataUserFromStore.length > 0 && (
        <>
          <h2>User data from forms</h2>
          <div className={styles.home}>
            {dataUserFromStore.map((user, index) => (
              <DataUserOnPage
                key={index}
                index={index + 1}
                name={user.name}
                age={user.age}
                gender={user.gender}
                email={user.email}
                country={user.country}
                password={user.password}
                file={user.file}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
