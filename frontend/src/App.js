import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
     <Header />
     <main className="my-2">
      <Container>
        <Outlet />
      </Container>
     </main>
     <Footer />
     <ToastContainer />
    </>
  );
}

export default App;
