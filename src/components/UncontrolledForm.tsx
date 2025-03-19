import styles from '../styles/Forms.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataFormsSliceAction } from '../redux/slices/DataFormsSlice';
import useValidationSchema from '../yup/useValidationSchema';
import FileInput from './FileInput';
import * as yup from 'yup';
import CheckPassword from './CheckPassword';
import { RootState } from '../redux/store';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatchFunction = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [countryInput, setCountryInput] = useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(0);
  const [file, setFile] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const countries = useSelector(
    (state: RootState) => state.countriesSlice.countries
  );
  const validationSchema = useValidationSchema();

  const validateForm = async () => {
    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      gender: genderRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      country: countryRef.current?.value,
      agreement: agreementRef.current?.checked,
      file,
    };

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true; // Валидация успешна
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
        setErrors(errorMessages);
      }
      return false; // Валидация не прошла
    }
  };

  const handleCountryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCountryInput(value);

    if (value === '') {
      setFilteredCountries([]);
    } else {
      const filtered = countries.filter((country: string) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );

      if (filtered[0].toUpperCase() === value.toUpperCase()) {
        setFilteredCountries([]);
        setIsDropdownVisible(false);
      } else {
        setIsDropdownVisible(true);
        setFilteredCountries(filtered);
      }
    }
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPasswordLength(value.length);
  };

  const handleCountryClick = () => {
    setIsDropdownVisible(true);
  };

  const handleCountrySelect = (country: string) => {
    setIsDropdownVisible(false);
    setFilteredCountries([]);
    setCountryInput(country);
  };

  const handleButtonCloseCountry = () => {
    setIsDropdownVisible(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = await validateForm();

    if (isValid) {
      dispatchFunction(
        dataFormsSliceAction.addUser({
          name: nameRef.current?.value,
          age: ageRef.current?.value,
          gender: genderRef.current?.value,
          email: emailRef.current?.value,
          country: countryRef.current?.value,
          password: passwordRef.current?.value,
          file: file,
        })
      );
      navigate('/');
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Uncontrolled Form</h1>
        <div className={styles.wrapInput}>
          <input
            id="name"
            className={styles.input}
            type="text"
            ref={nameRef}
            placeholder="Enter your name"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.wrapInput}>
          <input
            id="age"
            className={styles.input}
            type="number"
            ref={ageRef}
            placeholder="Age"
          />
          {errors.age && <p className={styles.error}>{errors.age}</p>}
        </div>
        <div className={styles.wrapInputSelect}>
          <span className={styles.labelSelect}>Select gender</span>
          <select
            id="gender"
            className={styles.genderSelect}
            ref={genderRef}
            defaultValue=""
          >
            <option
              className={styles.genderSelectTitle}
              value=""
              disabled
            ></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
        <div className={styles.wrapInput}>
          <input
            id="email"
            className={styles.input}
            type="text"
            ref={emailRef}
            placeholder="Enter your email"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={`${styles.wrapInput} ${styles.country}`}>
          <input
            id="country"
            className={styles.input}
            type="text"
            value={countryInput}
            onChange={handleCountryInputChange}
            onClick={handleCountryClick}
            placeholder="Select Country"
            ref={countryRef}
          />
          {errors.country && <p className={styles.error}>{errors.country}</p>}
          {isDropdownVisible && (
            <div className={styles.countryList}>
              <button
                className={styles.btnCloseCountry}
                onClick={handleButtonCloseCountry}
              >
                ✖
              </button>
              <ul>
                {(filteredCountries.length > 0
                  ? filteredCountries
                  : countries
                ).map((country) => (
                  <li
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
              <span>❱</span>
            </div>
          )}
        </div>
        <div className={styles.wrapInput}>
          <input
            id="password"
            className={styles.input}
            type="password"
            ref={passwordRef}
            placeholder="Password"
            onChange={handlePasswordInputChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          {passwordLength > 0 && (
            <div className={styles.passwordLevel}>
              <CheckPassword passwordLength={passwordLength} />
            </div>
          )}
        </div>
        <div className={styles.wrapInput}>
          <input
            id="confirmPassword"
            className={styles.input}
            type="password"
            ref={confirmPasswordRef}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <FileInput
            onFileChange={(file) => setFile(file)}
            error={errors.file}
          />
        </div>
        <div className={styles.agreement}>
          <div className={styles.agreementField}>
            <label htmlFor="agreement">I accept the agreement</label>
            <input
              className={styles.checkbox}
              id="agreement"
              type="checkbox"
              ref={agreementRef}
            />
          </div>
          {errors.agreement && (
            <p className={styles.error}>{errors.agreement}</p>
          )}
        </div>
        <div className={styles.conteainerBtn}>
          <div className={styles.wrapBtn}>
            <div className={styles.bgbtn}></div>
            <button className={styles.btn} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UncontrolledForm;
