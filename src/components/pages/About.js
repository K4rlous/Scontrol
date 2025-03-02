import styles from './About.module.css'
import gran from '../../img/gran.png'
export default function About() {
  return (
    <div className={styles.about}>
      <a href='https://faculdade.grancursosonline.com.br' target="_blank" rel="noopener noreferrer">
      <img src={gran} alt='Logo da Gran Faculdade'/>
      </a>
      <h2>Sobre o Projeto</h2>
      <p>
        Como projeto intregador da <span className={styles.gran} >Gran</span><span className={styles.faculdade}> Faculdade</span> tive a tarefa de desenvolver um projeto full stack, que basicamente consiste em um sistema de controle de estoque. Batizei o projeto de <span className={styles.scontrol}>Scotrol</span> (stock control), e ele consiste em uma aplicação de três features que foram exigidas
      </p>
      <h3>Feature 01:  Cadastro de Fornecedores</h3>
      <p>Essa feature deve levar em conta três possíveis cenários, sendo eles:</p>
      <p>A possibilidade de cadastrar um fornecedor com informações válidas, registrar as informações no sistema e exibir uma mensagem de <span className={styles}>"Fornecedor cadastrado com sucesso!"</span></p>
      <p>Captar tentativas de cadastrar um fornecedor com o CNPJ já cadastrado no sistema e exibir uma mensagem de <span className={styles.bold}>"Fornecedor com esse CNPJ já está cadastrado!"</span> </p>
      <p>E por fim captar tentativas de cadastrar fornecedores com informações inválidas ou com campos obrigatórios em branco e exibir mensagens de erro relevantes ao lado dos campos inválidos</p>
      <h3>Feature 02:  Cadastro de Produtos</h3>
      <p>Essa feature deve levar em conta três possíveis cenários, sendo eles:</p>
      <p>A possibilidade de cadastrar um produto com informações válidas, registrar as informações no sistema e exibir uma mensagem de <span className={styles.bold}>"produto cadastrado com sucesso!"</span></p>
      <p>Captar tentativas de cadastrar um produto com o código de barras já cadastrado no sistema e exibir uma mensagem de <span className={styles.bold}>"Produto com esse código de barras já está cadastrado!"</span>" </p>
      <p>E por fim captar tentativas de cadastrar produtos com informações inválidas ou com campos obrigatórios em branco e exibir mensagens de erro relevantes ao lado dos campos inválidos</p>
      <h3>Feature 03:  Associação de Fornecedor a Produto</h3>
      <p>Essa feature deve levar em conta três possíveis cenários, sendo eles:</p>
      <p>Detalhar um produto especíico, listar os fornecedores cadastrados e através de um botão associar o fornecedor selecionado ao produto detalhado e exibir uma mensagem de <span className={styles.bold}>"Fornecedor associado com sucesso ao produto!"</span></p>
      <p>Captar tentativas de associar um fornecedor ao mesmo produto já associado e exibir uma mensagem de <span className={styles.bold}>"Fornecedor já está associado a este produto"</span></p>
      <p>Permitir escolher um fornecedor associado e através de um botão "desassociar fornecedor", o fornecedor deve ser desassociado do produto e uma mensagem de <span className={styles.bold}>"Fornecedor desassociado com sucesso!"
      </span> deve ser exibida.</p>
      <h2>Informações técnicas do projeto</h2>
      <p>As seguintes bibliotecas foram usadas: </p>
      <ul>
        <li>Axios (Para fazer as requisições ao servidor)</li>
        <li>Json-Server (Servidor falso para guardar as informações)</li>
        <li>React-Icons (Biblioteca de ícones)</li>
        <li>React-Router (Conjunto de componentes para rotas e navegação no aplicativo)</li>
      </ul>
      <h4>OBS:</h4>
      <p>A utilização de Axios com Json-server não permite o envio de imagens para o servidor, e devido a um erro cuja causa apenas Deus conhece, a página de 'Associação' não carrega os produtos, acredito que esteja relacionado ao caminho das rotas, provavelmente devo ter feito alguma besteira, passei algumas horas tentando corrigir e cedi ao estresse mental, essa é razão de existirem algumas bibliotecas como o 'express' vinculadas ao projeto, apesar é claro de não estarem sendo usadas, sinta-se a vontade para corrigir se quiser (se alguem ler isso)</p>
    </div>
    
  )
}
