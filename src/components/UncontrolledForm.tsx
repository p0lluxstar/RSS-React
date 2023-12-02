import styles from './UncontrolledForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { LoginSchema } from '../utils/yup';

const UncontrolledForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameValue = { name: nameInputRef.current?.value };

    try {
      await LoginSchema.validate(nameValue);
      navigate('/');
    } catch (validationError) {
      alert(validationError);
    }
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form className={styles.uf} onSubmit={handleSubmit}>
        <input type="text" ref={nameInputRef} placeholder="Name" />
        <input type="number" placeholder="Age" />
        <input type="text" placeholder="Email" />
        <div className={styles.btn}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UncontrolledForm;
