

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom';
import ToDo from './pages/todo/ToDo';
import NavBar from "./components/navBar/NavBar";
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import SingleTask from './pages/singleTask/SingleTask';
import NotFound from "./pages/notFound/NotFound";


const pages = [
  {
    path: "/",
    element: <ToDo />,
  },
  {
    path: "/todo",
    element: <ToDo />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/task/:taskId",
    element: <SingleTask />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];



function App() {
  return (
    <BrowserRouter>
      <main>
        <NavBar />
        <Routes>
          {
            pages.map(page => (
            <Route
            key = {page.path}
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
      </main>
    </BrowserRouter>

  );
}

export default App;
