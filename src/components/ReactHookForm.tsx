import styles from '../styles/Forms.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IDataForm } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dataFormsSliceAction } from '../redux/slices/DataFormsSlice';
import useValidationSchema from '../yup/useValidationSchema';
import FileInput from './FileInput';
import CheckPassword from './CheckPassword';
import { RootState } from '../redux/store';

const ReactHookForm = () => {
  const [countryInput, setCountryInput] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [file, setFile] = useState<string | null>(null);
  const countries = useSelector(
    (state: RootState) => state.countriesSlice.countries
  );
  const navigate = useNavigate();
  const dispatchFunction = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<IDataForm>({
    mode: 'onChange',
    resolver: yupResolver(useValidationSchema()),
  });

  const passwordLength = (watch(['password'])[0] || '').length;

  const onSubmit = (data: IDataForm) => {
    dispatchFunction(
      dataFormsSliceAction.addUser({
        name: data.name,
        age: data.age,
        gender: data.gender,
        email: data.email,
        country: data.country,
        password: data.password,
        file: file,
      })
    );
    navigate('/');
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
        country.toUpperCase().startsWith(value.toUpperCase())
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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>React Hook Form</h1>
        <div>
          <input
            {...register('name')}
            id="name"
            placeholder="Name"
            type="text"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('age')}
            id="age"
            placeholder="Age"
            type="number"
          />
          {errors.age && <p className={styles.error}>{errors.age.message}</p>}
        </div>
        <div className={styles.gender}>
          <div className={styles.genderField}>
            <p>Select gender</p>
            <select {...register('gender')} id="gener" defaultValue="">
              <option value="" disabled></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {errors.gender && (
            <p className={styles.error}>{errors.gender.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('email')}
            id="email"
            placeholder="Email"
            type="string"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.country}>
          <input
            {...register('country')}
            id="country"
            type="text"
            value={countryInput}
            onInput={handleCountryInputChange}
            onClick={handleCountryClick}
            placeholder="Select Country"
          />
          {errors.country && (
            <p className={styles.error}>{errors.country.message}</p>
          )}
          {isDropdownVisible && (
            <div className={styles.countryList}>
              <button
                className={styles.btnCloseCountry}
                onClick={handleButtonCloseCountry}
              >
                x
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
        <div className={styles.password}>
          <input
            {...register('password')}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          {passwordLength > 0 && (
            <div className={styles.passwordLevel}>
              <CheckPassword passwordLength={passwordLength} />
            </div>
          )}
        </div>
        <div>
          <input
            {...register('confirmPassword')}
            placeholder="Confirm password"
            type="password"
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <FileInput
          {...register('file')}
          onFileChange={(file) => {
            setFile(file);
            setValue('file', file);
          }}
        />
        <div className={styles.agreement}>
          <div className={styles.agreementField}>
            <label htmlFor="agreement">I accept the agreement</label>
            <input
              {...register('agreement')}
              id="agreement"
              className={styles.checkbox}
              type="checkbox"
            />
          </div>
          {errors.agreement && (
            <p className={styles.error}>{errors.agreement.message}</p>
          )}
        </div>
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
