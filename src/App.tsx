import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booth from './pages/Booth';
import Editor from './pages/Editor';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <div className="w-full h-screen bg-retro-cream text-retro-dark font-sans overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booth" element={<Booth />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
