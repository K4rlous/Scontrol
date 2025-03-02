import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AssociacaoPage.module.css';
import Message from '../layout/Message';
import Container from '../layout/Container';

const AssociacaoPage = () => {
  const { produtoId } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [fornecedores, setFornecedores] = useState([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState('');
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  // Busca detalhes do produto
  const fetchProduto = useCallback(async () => {
    if (!produtoId) return;

    try {
      const response = await axios.get(`http://localhost:3001/produtos/${produtoId}`);
      setProduto(response.data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setMessage('Erro ao carregar produto!');
      setType('error');
    }
  }, [produtoId]);

  // Busca lista de fornecedores
  const fetchFornecedores = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      setMessage('Erro ao carregar fornecedores!');
      setType('error');
    }
  }, []);

  useEffect(() => {
    fetchProduto();
    fetchFornecedores();
  }, [fetchProduto, fetchFornecedores]);

  // Associa um fornecedor ao produto
  const handleAssociarFornecedor = async () => {
    if (!selectedFornecedor) {
      setMessage('Selecione um fornecedor para associar!');
      setType('error');
      return;
    }

    if (produto.fornecedores.includes(selectedFornecedor)) {
      setMessage('Fornecedor já associado!');
      setType('error');
      return;
    }

    try {
      // Atualiza o produto com o novo fornecedor associado
      const updatedFornecedores = [...produto.fornecedores, selectedFornecedor];
      await axios.patch(`http://localhost:3001/produtos/${produtoId}`, {
        fornecedores: updatedFornecedores,
      });
      setProduto({ ...produto, fornecedores: updatedFornecedores });
      setMessage('Fornecedor associado com sucesso!');
      setType('success');
    } catch (error) {
      console.error('Erro ao associar fornecedor:', error);
      setMessage('Erro ao associar fornecedor!');
      setType('error');
    }
  };

  // Desassocia um fornecedor do produto
  const handleDesassociarFornecedor = async (fornecedorId) => {
    try {
      const updatedFornecedores = produto.fornecedores.filter((id) => id !== fornecedorId);
      await axios.patch(`http://localhost:3001/produtos/${produtoId}`, {
        fornecedores: updatedFornecedores,
      });
      setProduto({ ...produto, fornecedores: updatedFornecedores });
      setMessage('Fornecedor desassociado com sucesso!');
      setType('success');
    } catch (error) {
      console.error('Erro ao desassociar fornecedor:', error);
      setMessage('Erro ao desassociar fornecedor!');
      setType('error');
    }
  };

  return (
    <Container>
      <div className={styles.layout}>
        {message && <Message type={type} msg={message} />}
        <h1>Associação de Fornecedor a Produto</h1>

        {produto ? (
          <div className={styles.produtoDetalhes}>
            <h2>Detalhes do Produto</h2>
            <p><strong>Nome:</strong> {produto.nomeProduto}</p>
            <p><strong>Código de Barras:</strong> {produto.codBarras}</p>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
          </div>
        ) : (
          <p>Carregando produto...</p>
        )}

        <div className={styles.associacaoForm}>
          <h2>Associar Fornecedor</h2>
          <select
            value={selectedFornecedor}
            onChange={(e) => setSelectedFornecedor(e.target.value)}
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nomeEmpresa} - {fornecedor.cnpj}
              </option>
            ))}
          </select>
          <button onClick={handleAssociarFornecedor}>Associar</button>
        </div>

        <div className={styles.fornecedoresAssociados}>
          <h2>Fornecedores Associados</h2>
          {produto && produto.fornecedores.length > 0 ? (
            <ul>
              {produto.fornecedores.map((fornecedorId) => {
                const fornecedor = fornecedores.find((f) => f.id === fornecedorId);
                return (
                  <li key={fornecedorId}>
                    <p><strong>Nome:</strong> {fornecedor?.nomeEmpresa}</p>
                    <p><strong>CNPJ:</strong> {fornecedor?.cnpj}</p>
                    <button onClick={() => handleDesassociarFornecedor(fornecedorId)}>
                      Desassociar
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nenhum fornecedor associado.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AssociacaoPage;
