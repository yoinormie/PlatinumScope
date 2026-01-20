import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Footer from "./components/Footer";
import './index.css'

function IndexPage() {
  return (
    <>
      <SearchBar />
      <Header />
      <main>
        <Intro />
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
