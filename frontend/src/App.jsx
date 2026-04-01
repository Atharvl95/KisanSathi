import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Mainpage from "./Pages/Mainpage/Mainpage";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Auth from "./Pages/Auth/Auth";
import Contactus from "./Pages/Contactus/Contactus";
import Solutions from "./Pages/Solutions/Solutions";
import Blogs from "./Pages/Blogs/Blogs";

import Admindash from "./Pages/Admindash/Admindash";
import AdminOverview from "./Components/Admindashboard/AdminOverview";
import ManageUsers from "./Components/Admindashboard/ManageUsers";
import ManageExperts from "./Components/Admindashboard/ManageExperts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/blogs" element={<Blogs />} />

        {/* Admin Routes */}
        <Route path="/admindashboard" element={<Admindash />}>
  <Route index element={<AdminOverview />} />
  <Route path="users" element={<ManageUsers />} />
  <Route path="experts" element={<ManageExperts />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;