import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./Pages/Mainpage/Mainpage";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Auth from "./Pages/Auth/Auth";
import Contactus from "./Pages/Contactus/Contactus";
import Solutions from "./Pages/Solutions/Solutions";
import Blogs from "./Pages/Blogs/Blogs";
import KisansathiNavbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;