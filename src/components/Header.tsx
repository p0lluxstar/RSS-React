/* import styles from '../styles/MainLayoutr.module.css'; */
import { Search } from './Search';

interface Current {
  clickOnSearch(): void;
}

const Header = (props: Current) => {
  function updateComponentMain() {
    props.clickOnSearch();
  }

  return (
    <>
      <header className={'header'}>
        <Search clickOnSearch={updateComponentMain} />
      </header>
    </>
  );
};

export default Header;
