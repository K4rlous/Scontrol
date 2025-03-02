import { useState } from "react"
import styles from './ProdutoForm.module.css'
import Select from 'react-select'

export default function ProdutoForm({ onSubmit }) {
    const [produto, setProduto] = useState({
        nomeProduto: '',
        codBarras: '',
        descricao: '',
        qtdEstoque: '',
        categoria: '',
        dataVali: '',
        img: ''
    })

    const options = [
        { value: 'eletronicos', label: 'Eletrônicos' },
        { value: 'alimentos', label: 'Alimentos' },
        { value: 'vestuario', label: 'Vestuário' },
        { value: 'outro', label: 'Outro' }
      ]
      
    const handleChange = (e) => {
        const {name, value} = e.target

        setProduto({...produto, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(produto)

    }
  return (
    <div className={styles.form_control}>
       <form onSubmit={handleSubmit}>
        <input type="text" name="nomeProduto" placeholder="Insira o nome do produto" value={produto.nomeProduto} onChange={handleChange} required />
        <input type="text" name="codBarras" placeholder="Insira o Código de barras do produto" value={produto.codBarras} onChange={handleChange} required />
        <textarea name="descricao" placeholder="Insira a descrição do produto" value={produto.descricao} onChange={handleChange} required />
        <input type="number" name="qtdEstoque" placeholder="Insira a quantidade do produto no estoque" value={produto.qtdEstoque} onChange={handleChange} required  />
        <Select
          options={options}
          className={styles.select}
          placeholder="Insira a categoria do produto"
          onChange={(selectedOption) => setProduto({ ...produto, categoria: selectedOption.value })}
        />
        <p>Data de validade do Produto (se aplicável)</p>
        <input type="date" name="dataVali" placeholder="Data de validade (se aplicável)" value={produto.dataVali} onChange={handleChange}  />
        <p>Imagem do Produto (se aplicável)</p>
        <input type="file" name="img" onChange={(e) => setProduto({ ...produto, img: e.target.files[0] })} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
