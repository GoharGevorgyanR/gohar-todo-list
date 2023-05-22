import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from "./components/navBar/NavBar";
import { useSelector } from "react-redux";
import { routes } from './routes';
import  Loader   from './components/loader/Loader';






function App() {

  const isLoading = useSelector((store)=>store.loader.isLoading);
  
 

  return (    
      <BrowserRouter>
        <main>
          <NavBar />
          <Routes>
            {
              routes.map(page => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={page.element}
                />
              ))
            }

          </Routes>

          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />       
           {isLoading && <Loader />}
        </main>
      </BrowserRouter>
    
  );
}
export default App;