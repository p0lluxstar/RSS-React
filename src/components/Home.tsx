import styles from './Home.module.css';
import { useSelector } from 'react-redux';

interface DataUncontrolled {
  userDataUncontrolledForm: {
    dataUser: {
      name: string;
      age: string;
      email: string;
      password: string;
    };
  };
}

interface DataHookForm {
  userDataReactHookForm: {
    dataUser: {
      name: string;
      age: string;
      email: string;
      password: string;
    };
  };
}

const Home = () => {
  const dataUserUncontrolledForm = useSelector(
    (state: DataUncontrolled) => state.userDataUncontrolledForm
  );
  const dataReactHookForm = useSelector(
    (state: DataHookForm) => state.userDataReactHookForm
  );

  return (
    <>
      <h1>Home</h1>
      {dataUserUncontrolledForm.dataUser.name != '' && (
        <>
          <div className={styles['data-user']}>
            <h3>User data from uncontrolled form</h3>
            <p>Name: {dataUserUncontrolledForm.dataUser.name}</p>
            <p>Age: {dataUserUncontrolledForm.dataUser.age}</p>
            <p>Email: {dataUserUncontrolledForm.dataUser.email}</p>
            <p>Password: {dataUserUncontrolledForm.dataUser.password}</p>
          </div>
        </>
      )}
      {dataReactHookForm.dataUser.name != '' && (
        <>
          <div className={styles['data-user']}>
            <h3>User data from react hook form</h3>
            <p>Name: {dataReactHookForm.dataUser.name}</p>
            <p>Age: {dataReactHookForm.dataUser.age}</p>
            <p>Email: {dataReactHookForm.dataUser.email}</p>
            <p>Password: {dataReactHookForm.dataUser.password}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
