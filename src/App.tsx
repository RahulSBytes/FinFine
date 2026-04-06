import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/pages/Dashboard";
import Insigt from "./components/pages/Insight";
import TransactionsPage from "./components/pages/Transaction";
import AddTransaction from "./components/pages/AddTransaction";
import NotFound from "./components/pages/NotFound";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

export default function App() {
  const isDark = useThemeStore((s) => s.isDark);

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="insights" element={<Insigt />} />
        <Route path="add" element={<AddTransaction />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
