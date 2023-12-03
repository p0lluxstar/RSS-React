import styles from './UncontrolledForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { nameSchema, ageSchema, emailSchema } from '../utils/yup';

const UncontrolledForm = () => {
  const [nameError, setNameError] = useState('');
  const [isEnteredName, setIsEnteredName] = useState(false);

  const [ageError, setAgeError] = useState('');
  const [isEnteredAge, setIsEnteredAge] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [isEnteredEmail, setIsEnteredEmail] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameValue = { name: nameInputRef.current?.value };
    const ageValue = { age: ageInputRef.current?.value };
    const emailValue = { email: emailInputRef.current?.value };

    try {
      await nameSchema.validate(nameValue);
      setIsEnteredName(false);
    } catch (validationError) {
      setIsEnteredName(true);
      setNameError((validationError as Error).message);
      nameValue.name = undefined;
    }

    try {
      await ageSchema.validate(ageValue);
      setIsEnteredAge(false);
    } catch (validationError) {
      setIsEnteredAge(true);
      setAgeError((validationError as Error).message);
      ageValue.age = undefined;
    }

    try {
      await emailSchema.validate(emailValue);
      setIsEnteredEmail(false);
    } catch (validationError) {
      setIsEnteredEmail(true);
      setEmailError((validationError as Error).message);
      emailValue.email = undefined;
    }

    if (nameValue.name && ageValue.age && emailValue.email) {
      navigate('/');
    }
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form className={styles.uf} onSubmit={handleSubmit}>
        <input type="text" ref={nameInputRef} placeholder="Name" />
        {isEnteredName && <p className={styles.error}>{nameError}</p>}
        <input type="number" ref={ageInputRef} placeholder="Age" />
        {isEnteredAge && <p className={styles.error}>{ageError}</p>}
        <input type="text" ref={emailInputRef} placeholder="Email" />
        {isEnteredEmail && <p className={styles.error}>{emailError}</p>}
        <div className={styles.btn}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UncontrolledForm;
