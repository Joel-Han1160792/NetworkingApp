import { LoginForm } from "../components/LoginForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import type JwtPayload from '../types/jwt';

export function LoginPage() {

  const { setUser } = useUser();
  const navigate = useNavigate();

  // Called when login is successful
 

  const handleLoginSuccess = (user: JwtPayload) => {
    setUser(user);
    navigate('/profile'); // To userProfile 
  };


  return(
    <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
        <Navbar />
        <main className="pt-16 w-full">
          <LoginForm onLogin={handleLoginSuccess}/>
        </main>
        <Footer />
      </div>
  )
}