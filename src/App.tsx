import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/pages/Dashboard";
import Insigt from "./components/pages/Insight";
import Transaction from "./components/pages/Transaction";
import AddTransaction from "./components/pages/AddTransaction";
import NotFound from "./components/pages/NotFound";



export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="insights" element={<Insigt />} />
        <Route path="add" element={<AddTransaction />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

