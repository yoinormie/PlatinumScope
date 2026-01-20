import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./components/ReviewPage";
import IndexPage from './Index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
