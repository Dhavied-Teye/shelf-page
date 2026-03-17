import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharePage from "./pages/SharePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share/:id" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
