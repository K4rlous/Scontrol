import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProdutoForm from '../ProdutoForm';
import EditProdutoForm from '../EditProdutoForm';
import styles from './ProdutoPage.module.css';
import Message from '../layout/Message';
import Container from '../layout/Container';

export default function ProdutoPage() {
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [produtos, setProdutos] = useState([]);
  const [editingProduto, setEditingProduto] = useState(null);
  const { produtoId } = useParams(); // Captura o produtoId da URL
  console.log('produtoId:', produtoId); // Verifique se o produtoId está correto

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setMessage('Erro ao carregar produtos!');
      setType('error');
    }
  };

  const handleCadastro = async (produto) => {
    try {
      const response = await axios.get('http://localhost:3001/produtos', {
        params: { codBarras: produto.codBarras }
      });
      if (response.data.length > 0) {
        setMessage('Produto com esse código de barras já está cadastrado!');
        setType('error');
        return false;
      }

      await axios.post('http://localhost:3001/produtos', produto);
      setMessage('Produto cadastrado com sucesso!');
      setType('success');
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao cadastrar produto', error);
      setMessage('Erro ao cadastrar produto!');
      setType('error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/produtos/${id}`);
      setMessage('Produto excluído com sucesso!');
      setType('success');
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto', error);
      setMessage('Erro ao excluir produto!');
      setType('error');
    }
  };

  const handleUpdate = async (produto) => {
    try {
      await axios.put(`http://localhost:3001/produtos/${produto.id}`, produto);
      setMessage('Produto atualizado com sucesso!');
      setType('success');
      setEditingProduto(null);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao atualizar produto', error);
      setMessage('Erro ao atualizar produto!');
      setType('error');
    }
  };

  return (
    <Container>
      <div className={styles.layout}>
        {message && <Message type={type} msg={message} />}
        <h1>Cadastro de Produto</h1>
        <ProdutoForm onSubmit={handleCadastro} />
        <h2>Lista de Produtos</h2>
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <p>{produto.nomeProduto}</p>
              <button className={styles.btn} onClick={() => setEditingProduto(produto)}>
                Editar
              </button>
              <button className={styles.btn} onClick={() => handleDelete(produto.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
        {editingProduto && (
          <EditProdutoForm
            produto={editingProduto}
            onSubmit={handleUpdate}
            onCancel={() => setEditingProduto(null)}
          />
        )}
      </div>
    </Container>
  );
}