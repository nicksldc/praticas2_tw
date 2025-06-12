import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Cadastro</Link></li>
        <li><Link to="/items">Itens</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;