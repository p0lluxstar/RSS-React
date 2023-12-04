import styles from './UncontrolledForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { userDataUncontrolledFormAction } from '../redux/slices/UserUncontrolledFormSlice';
import {
  nameSchema,
  ageSchema,
  emailSchema,
  passwordSchema,
} from '../utils/yup';

const UncontrolledForm = () => {
  const [nameError, setNameError] = useState('');
  const [isEnteredName, setIsEnteredName] = useState(false);

  const [ageError, setAgeError] = useState('');
  const [isEnteredAge, setIsEnteredAge] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [isEnteredEmail, setIsEnteredEmail] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [isEnteredPassword, setIsEnteredPassword] = useState(false);

  const [passwordLevel, setPasswordLevel] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatchFunction = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameValue = { name: nameInputRef.current?.value };
    const ageValue = { age: ageInputRef.current?.value };
    const emailValue = { email: emailInputRef.current?.value };
    const passwordValue = { password: passwordInputRef.current?.value };

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

    try {
      await passwordSchema.validate(passwordValue);
      setIsEnteredPassword(false);

      const passwordLength: number | undefined = passwordValue.password?.length;

      if (passwordLength && passwordLength < 9) {
        setPasswordLevel('Password complexity - weak.');
      } else if (passwordLength && passwordLength < 12) {
        setPasswordLevel('Password complexity - average.');
      } else {
        setPasswordLevel('Password complexity - high.');
      }
    } catch (validationError) {
      setIsEnteredPassword(true);
      setPasswordError((validationError as Error).message);
      passwordValue.password = undefined;
      setPasswordLevel('');
    }

    if (
      nameValue.name &&
      ageValue.age &&
      emailValue.email &&
      passwordValue.password
    ) {
      dispatchFunction(
        userDataUncontrolledFormAction.addUser({
          name: nameValue.name,
          age: ageValue.age,
          email: emailValue.email,
          password: passwordValue.password,
        })
      );
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
        <input type="password" ref={passwordInputRef} placeholder="Password" />
        {isEnteredPassword && <p className={styles.error}>{passwordError}</p>}
        <p className={styles['password-level']}>{passwordLevel}</p>
        <div className={styles.btn}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UncontrolledForm;
