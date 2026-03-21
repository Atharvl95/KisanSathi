import Hero from "../../Components/Hero/Hero";
import Features from "../../Components/Features/Features";
import Layout from "../../Components/Layout/Layout"; // ✅ add this

function Mainpage() {
  return (
    <Layout>
      <Hero />
      <Features />
    </Layout>
  );
}

export default Mainpage;