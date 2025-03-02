import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FornecedorForm from '../FornecedorForm';
import EditFornecedorForm from '../EditFornecedorForm'; 
import styles from './FornecedorPage.module.css';
import Message from '../layout/Message';
import Container from '../layout/Container';

const FornecedorPage = () => {
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [fornecedores, setFornecedores] = useState([]);
  const [editingFornecedor, setEditingFornecedor] = useState(null); 

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      setMessage('Erro ao carregar fornecedores!');
      setType('error');
    }
  };

  const handleCadastro = async (fornecedor) => {
    try {
      const response = await axios.get('http://localhost:3001/fornecedores', {
        params: { cnpj: fornecedor.cnpj }
      });
      if (response.data.length > 0) {
        setMessage('Fornecedor com esse CNPJ já está cadastrado!');
        setType('error');
        return false;
      }

      await axios.post('http://localhost:3001/fornecedores', fornecedor);
      setMessage('Fornecedor cadastrado com sucesso!');
      setType('success');
      fetchFornecedores(); 
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      setMessage('Erro ao cadastrar fornecedor.');
      setType('error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/fornecedores/${id}`);
      setMessage('Fornecedor excluído com sucesso!');
      setType('success');
      fetchFornecedores();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
      setMessage('Erro ao excluir fornecedor.');
      setType('error');
    }
  };

  const handleUpdate = async (fornecedor) => {
    try {
      await axios.put(`http://localhost:3001/fornecedores/${fornecedor.id}`, fornecedor);
      setMessage('Fornecedor atualizado com sucesso!');
      setType('success');
      setEditingFornecedor(null); 
      fetchFornecedores(); 
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      setMessage('Erro ao atualizar fornecedor.');
      setType('error');
    }
  };

  return (
    <Container>
      <div className={styles.layout}>
        {message && <Message type={type} msg={message} />}
        <h1>Cadastro de Fornecedor</h1>
        <FornecedorForm onSubmit={handleCadastro} />
        <h2>Lista de Fornecedores</h2>
        <ul>
          {fornecedores.map((fornecedor) => (
            <li key={fornecedor.id}>
              <p>{fornecedor.nomeEmpresa}</p>
              <button className={styles.btn} onClick={() => setEditingFornecedor(fornecedor)}>
                Editar
              </button>
              <button className={styles.btn} onClick={() => handleDelete(fornecedor.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
        {editingFornecedor && (
          <EditFornecedorForm
            fornecedor={editingFornecedor}
            onSubmit={handleUpdate}
            onCancel={() => setEditingFornecedor(null)}
          />
        )}
      </div>
    </Container>
  );
};

export default FornecedorPage;