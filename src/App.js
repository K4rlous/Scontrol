import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import About from './components/pages/About';
import ProdutoPage from './components/pages/ProdutoPage';
import FornecedorPage from './components/pages/FornecedorPage';
import AssociacaoPage from './components/pages/AssociacaoPage';
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container customClass='min-height'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cadProduto" element={<ProdutoPage />} />
            <Route exact path="/cadFornecedor" element={<FornecedorPage />} />
            <Route path="/produtos/:produtoId" element={<ProdutoPage />} />
            <Route exact path="/associacao" element={<AssociacaoPage />} />
            <Route exact path="/associacao/:produtoId" element={<AssociacaoPage />} />
            <Route exact path="/sobre" element={<About />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}
