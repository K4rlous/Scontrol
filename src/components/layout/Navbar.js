import {Link} from 'react-router-dom'
import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/scontrol_logo.png'


export default function Navbar() {
  return (
   <nav className={styles.navbar}>
    <Container>
        <Link to='/'><img src={logo} alt='Scontrol' style={{ width: '80px', height: '80px' }}/></Link>
        <ul className={styles.list}>
            <li className={styles.item}><Link to='/'>Home</Link></li>
            <li className={styles.item}><Link to='/cadFornecedor'>Cadastrar Fornecedor</Link></li>
            <li className={styles.item}><Link to='/cadProduto'>Cadastrar Produtos</Link></li>
            <li className={styles.item}><Link to='/associacao'>Associação</Link></li>
            <li className={styles.item}><Link to='/sobre'>Sobre</Link></li>
        </ul>
    </Container>
   </nav>
  )
}
