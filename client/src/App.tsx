import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RepoDetail from "./pages/RepoDetailPage";
import HistoryPage from "./pages/HistoryPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 py-8 dark:bg-neutral-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/repo/:owner/:repo" element={<RepoDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
