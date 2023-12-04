import { useSelector } from 'react-redux';
import DataUserOnPage from './DataUserOnPage';
import { DataUncontrolledForm, DataReactHookForm } from '../types/interfaces';

const Home = () => {
  const dataUserUncontrolledForm = useSelector(
    (state: DataUncontrolledForm) => state.userDataUncontrolledForm
  );
  const dataReactHookForm = useSelector(
    (state: DataReactHookForm) => state.userDataReactHookForm
  );

  return (
    <>
      <h1>Home</h1>
      {dataUserUncontrolledForm.dataUser.name != '' && (
        <>
          <DataUserOnPage
            title="User data from uncontrolled form"
            name={dataUserUncontrolledForm.dataUser.name}
            age={dataUserUncontrolledForm.dataUser.age}
            email={dataUserUncontrolledForm.dataUser.email}
            password={dataUserUncontrolledForm.dataUser.password}
          />
        </>
      )}
      {dataReactHookForm.dataUser.name != '' && (
        <>
          <DataUserOnPage
            title="User data from react hook form"
            name={dataReactHookForm.dataUser.name}
            age={dataReactHookForm.dataUser.age}
            email={dataReactHookForm.dataUser.email}
            password={dataReactHookForm.dataUser.password}
          />
        </>
      )}
    </>
  );
};

export default Home;
