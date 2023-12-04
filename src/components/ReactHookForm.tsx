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
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<DataForm>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

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

  let levelPassword = '';
  const lengthPassword = watch(['password'])[0];

  if (lengthPassword && lengthPassword.length < 9) {
    levelPassword = 'Password complexity - weak.';
  } else if (lengthPassword && lengthPassword.length <= 12) {
    levelPassword = 'Password complexity - average.';
  } else if (lengthPassword && lengthPassword.length > 12) {
    levelPassword = 'Password complexity - high.';
  }

  return (
    <>
      <h1>React Hook Form</h1>
      <form className={styles.rhf} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Name" type="text" />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        <input {...register('age')} placeholder="Age" type="number" />
        {errors.age && <p className={styles.error}>{errors.age.message}</p>}
        <input {...register('email')} placeholder="Email" type="string" />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        <input
          {...register('password')}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
        {!errors.password && lengthPassword && (
          <p className={styles['password-level']}>{levelPassword}</p>
        )}
        <div className={styles.btn}>
          <button disabled={!isValid} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ReactHookForm;
