import React, { useState } from 'react';
import styles from './FornecedorForm.module.css';

const FornecedorForm = ({ onSubmit }) => {
  const [fornecedor, setFornecedor] = useState({
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contatoPrincipal: ''
  });

  const formatCNPJ = (value) => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.slice(0, 14);

    if (formattedValue.length > 12) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    } else if (formattedValue.length > 8) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, '$1.$2.$3/$4');
    } else if (formattedValue.length > 5) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2.$3');
    } else if (formattedValue.length > 2) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{3})$/, '$1.$2');
    }

    return formattedValue;
  };

  const formatTelefone = (value) => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.slice(0, 11);

    if (formattedValue.length > 6) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (formattedValue.length > 2) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{4})$/, '($1) $2');
    } else if (formattedValue.length > 0) {
      formattedValue = formattedValue.replace(/^(\d{2})$/, '($1');
    }

    return formattedValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cnpj') {
      formattedValue = formatCNPJ(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }

    setFornecedor({ ...fornecedor, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fornecedor.cnpj.replace(/\D/g, '').length !== 14) {
      alert('O CNPJ deve ter exatamente 14 dígitos.');
      return;
    }

    if (fornecedor.telefone.replace(/\D/g, '').length !== 10) {
      alert('O telefone deve ter exatamente 11 dígitos.');
      return;
    }

    onSubmit(fornecedor);
  };

  return (
    <div className={styles.form_control}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nomeEmpresa" placeholder="Insira o nome da empresa" value={fornecedor.nomeEmpresa} onChange={handleChange} required />
        <input type="text" name="cnpj" placeholder="00.000.000/0000-00" value={fornecedor.cnpj} onChange={handleChange} required maxLength={18} />
        <input name="endereco" placeholder="Insira o endereço completo da empresa" value={fornecedor.endereco} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="(00) 0000-0000" value={fornecedor.telefone} onChange={handleChange} required maxLength={14} />
        <input type="email" name="email" placeholder="exemplo@fornecedor.com" value={fornecedor.email} onChange={handleChange} required />
        <input type="text" name="contatoPrincipal" placeholder="Nome do contato principal" value={fornecedor.contatoPrincipal} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FornecedorForm;