import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;