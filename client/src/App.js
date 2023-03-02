import './App.css';
import Landing from '../src/Views/Landing/Landing';
import Home from '../src/Views/Home/Home';
import NavBar from '../src/components/NavBar/NavBar';
import Form from './Views/Form/Form';
import Detail from './Views/Detail/Detail';
import About from './Views/About/About';
import About2 from './Views/About/About2';
import { Route, Routes, useLocation } from "react-router-dom";
import Error from './components/Error/Error';
import Footer from './Views/Footer/Footer';
import Favorites from './Views/Favorites/Favorites.jsx';
import Login from './components/Login/Login'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function App() {
  const location = useLocation()
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const username = 'admin@admin.com';
  const password = 'admin1234';


  function login(userData) {
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate('/home');
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Wrong username or password!`,
    })
  }
  }

  useEffect(() => {
    if (!access)
    navigate('/');
  }, [access]);

  function logOut() {
    setAccess(false)
    navigate('/');;
    
  }

  return (
    <div className="App">
      {(location.pathname !== '/' && location.pathname !== '/login') && <NavBar logOut={access ? logOut : null} />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login login={login} />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/about2" element={<About2 />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route path="/home/:id" element={<Detail props />} />
        <Route path="/activities" element={<Form />} />
        <Route path='*' element={<Error />} />
      </Routes>
      {(location.pathname !== '/' && location.pathname !== '/login') && <Footer />}
    </div>
  );
}

export default App;
