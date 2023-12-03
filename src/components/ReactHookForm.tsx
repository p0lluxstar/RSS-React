import styles from './ReactHookForm.module.css';
import { useForm } from 'react-hook-form';
import { nameSchema } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  name: string;
}

const ReactHookForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(nameSchema) });

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <h1>React Hook Form</h1>
      <form className={styles.rhf} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Name" type="name" />
        <p className={styles.error}>{errors.name?.message}</p>
        <div className={styles.btn}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default ReactHookForm;
