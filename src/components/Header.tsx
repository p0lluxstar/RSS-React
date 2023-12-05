import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/uncontrolled-form">Uncontrolled Form</NavLink>
        <NavLink to="/react-hook-form">React Hook Form</NavLink>
      </header>
    </>
  );
};

export default Header;
