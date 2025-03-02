import { useState } from "react";
import styles from './ProdutoForm.module.css';
import Select from 'react-select';

export default function EditProdutoForm({ produto, onSubmit, onCancel }) {
    const [editedProduto, setEditedProduto] = useState(produto);

    const options = [
        { value: 'eletronicos', label: 'Eletrônicos' },
        { value: 'alimentos', label: 'Alimentos' },
        { value: 'vestuario', label: 'Vestuário' },
        { value: 'outro', label: 'Outro' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduto({ ...editedProduto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedProduto);
    };

    return (
        <div className={styles.form_control}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nomeProduto" placeholder="Insira o nome do produto" value={editedProduto.nomeProduto} onChange={handleChange} required />
                <input type="text" name="codBarras" placeholder="Insira o Código de barras do produto" value={editedProduto.codBarras} onChange={handleChange} required />
                <textarea name="descricao" placeholder="Insira a descrição do produto" value={editedProduto.descricao} onChange={handleChange} required />
                <input type="number" name="qtdEstoque" placeholder="Insira a quantidade do produto no estoque" value={editedProduto.qtdEstoque} onChange={handleChange} required />
                <Select
                    options={options}
                    className={styles.select}
                    placeholder="Insira a categoria do produto"
                    value={options.find(option => option.value === editedProduto.categoria)}
                    onChange={(selectedOption) => setEditedProduto({ ...editedProduto, categoria: selectedOption.value })}
                />
                <p>Data de validade do Produto (se aplicável)</p>
                <input type="date" name="dataVali" placeholder="Data de validade (se aplicável)" value={editedProduto.dataVali} onChange={handleChange} />
                <p>Imagem do Produto (se aplicável)</p>
                <input type="file" name="img" onChange={(e) => setEditedProduto({ ...editedProduto, img: e.target.files[0] })} />
                <button className={styles.newBtn}type="submit">Atualizar</button>
                <button className={styles.newBtn}type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
}