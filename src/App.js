// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from "./components/Home";

function App() {
  return (
<Router>

<Routes>
    {/* <Route path='/' element={<Home />} /> */}
    <Route
      path='/*'
      element={
        <>
          <Routes>
            <Route path='/' element={<Login />} />
            {/* <Route path='/projects' element={<Projects />} /> */}
            {/* <Route path='/contact' element={<Contact />} /> */}
          </Routes>
          {/* <Footer /> */}
        </>
      }
    />
  </Routes>
</Router>
  );
}

export default App;
