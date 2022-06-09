import loader from '../../assets/users-page/loader.svg';
import s from './preloader.module.css';

const Preloader = () => {
  return <img src={loader} className={s.loader} alt="loading" />;
};

export default Preloader;
