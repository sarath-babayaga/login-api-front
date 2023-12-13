// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
