import styles from './ReactHookForm.module.css';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataForm } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userDataReactHookFormAction } from '../redux/slices/ReactHookFormSlice';

const ReactHookForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DataForm>({ resolver: yupResolver(loginSchema) });

  const navigate = useNavigate();
  const dispatchFunction = useDispatch();

  const onSubmit = (data: DataForm) => {
    dispatchFunction(
      userDataReactHookFormAction.addUser({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
      })
    );
    navigate('/');
  };

  return (
    <>
      <h1>React Hook Form</h1>
      <form className={styles.rhf} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Name" type="text" />
        <p className={styles.error}>{errors.name?.message}</p>
        <input {...register('age')} placeholder="Age" type="number" />
        <p className={styles.error}>{errors.age?.message}</p>
        <input {...register('email')} placeholder="Email" type="string" />
        <p className={styles.error}>{errors.email?.message}</p>
        <input
          {...register('password')}
          placeholder="Password"
          type="password"
        />
        <p className={styles.error}>{errors.password?.message}</p>
        <div className={styles.btn}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default ReactHookForm;
