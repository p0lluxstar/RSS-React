import styles from '../styles/Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <NavLink className={styles.headerBtn} to="/">
          Home
        </NavLink>
        <NavLink className={styles.headerBtn} to="/uncontrolled-form">
          Uncontrolled Form
        </NavLink>
        <NavLink className={styles.headerBtn} to="/react-hook-form">
          React Hook Form
        </NavLink>
      </header>
    </>
  );
};

export default Header;
