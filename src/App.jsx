import './assets/scss/all.scss';
import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getAuthorizationHeader, setRequestToken } from './connection/connection';
import { getCookie } from './tools/tools';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    (async () => {
      const token = getCookie('tdxApiToken');
      if (token) {
        setRequestToken(token);
      } else {
        await getAuthorizationHeader();
        const token = getCookie('tdxApiToken');
        setRequestToken(token);
      }
    })();
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
