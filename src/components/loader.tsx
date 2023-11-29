/* import styles from './loader.module.css'; */
import Image from 'next/image';
import testImg from '../public/loading.gif';

const Loader = () => {
  return (
    <div className={'loading'}>
      <Image src={testImg} width={32} height={32} alt="Loading" />
    </div>
  );
};

export default Loader;
