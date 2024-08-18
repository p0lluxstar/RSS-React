import styles from '../styles/CheckPassword.module.css';

interface IProps {
  passwordLength: number;
}

const CheckPassword = ({ passwordLength }: IProps) => {
  const strength =
    passwordLength < 9
      ? styles.weak
      : passwordLength <= 14
      ? styles.average
      : styles.high;

  return (
    <div className={strength}>
      <span>●●●</span>
    </div>
  );
};

export default CheckPassword;
