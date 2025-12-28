import { BrowserRouter, Routes, Route, Link,  } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Jeopardy from './pages/Jeopardy';

function App() {
  return (
    <BrowserRouter>
      <nav className="my-3">
        <Link className="mx-4" to="/">Home</Link>
        <Link className="me-4" to="/jeopardy">Jeopardy</Link>
        <Link className="me-4" to="/about">About</Link>
        <Link className="me-4" to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jeopardy" element={<Jeopardy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;