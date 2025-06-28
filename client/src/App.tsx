
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
;
import "./App.css";
import './index.css' ;
import {LoginPage} from './pages/LoginPage';
import LandingPage from './pages/LandingPage';




// function Home() {
//   return (
//     <div>
//       <h1>Home</h1>
//       <Link to="/login">Login</Link>
//       <br />
//       <Link to="/register">Register</Link>
//     </div>
//   );
// }

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
        
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
