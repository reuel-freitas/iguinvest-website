import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { QuemSomos } from "./pages/quemsomos";
import { TodosOsImoveis } from "./pages/todosOsImoveis";
import { Imovel } from "./pages/Imovel";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quemsomos" element={<QuemSomos />} />
        <Route path="todososimoveis" element={<TodosOsImoveis />} />
        <Route path="todososimoveis/:id" element={<Imovel />} />
      </Routes>
    </Router>
  );
}
