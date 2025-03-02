import styles from './Home.module.css'
import home from '../../img/home.png'
import Link from '../layout/Link'

export default function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem-vindo ao <span>Scontrol</span></h1>
      <p>Cadastre seus fornecedores, produtos e crie associações entre eles!</p>
      <div>
      <Link to='/cadFornecedor' text='Cadastrar Fornecedor'/>
      </div>
      <div>
      <Link to='/cadProduto' text='Cadastrar Produto'/>
      </div>
      <div>
      <Link to='/associacao' text='Associar Fornecedor/Produto'/>
      </div>
      <img src={home} alt='Scontrol'/>
    </section>
  )
}
