
import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
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

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/chatroom" element={<ChatRoomPage/>} />
        <Route path="/profile" element={<UserProfilePage/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
   
    </UserProvider>
    
    </>
  );
}

export default App;
