import styles from './UncontrolledForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nameValue = nameInputRef.current?.value;

    if (nameValue) {
      navigate('/');
    }
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form className={styles.uf} onSubmit={handleSubmit}>
        <input type="text" ref={nameInputRef} placeholder="Name" />
        <input type="number" name="age" placeholder="Age" />
        <input type="text" name="email" placeholder="Email" />
        <div className={styles.btn}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UncontrolledForm;
