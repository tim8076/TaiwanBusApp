import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
