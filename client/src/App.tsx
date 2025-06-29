
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
;
import "./App.css";
import './index.css' ;
import {LoginPage} from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { ChatRoomPage } from './pages/ChatRoomPage';
import { UserProvider } from './contexts/UserContext';
import UserProfilePage from './pages/UserProfilePage';



function App() {


  return (
    <>
     <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/chatroom" element={<ChatRoomPage/>} />
        <Route path="/profile" element={<UserProfilePage/>} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
    </UserProvider>
    
    </>
  );
}

export default App;
