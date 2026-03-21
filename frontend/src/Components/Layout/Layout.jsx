import KisansathiNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout({ children }) {
  return (
    <>
      <KisansathiNavbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;