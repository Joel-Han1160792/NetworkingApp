import { LoginForm } from "../components/LoginForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import type { JwtPayload } from "../types/jwt";
import type { User } from "../types/user";
import mapJwtPayloadToUser from "../utils/mapJwtPayloadToUser";
export function LoginPage() {

  const { setUser } = useUser();
  const navigate = useNavigate();

  // Called when login is successful
 

 const handleLoginSuccess = (payload: JwtPayload) => {
    console.log(payload)
    const user: User = mapJwtPayloadToUser(payload);
    setUser(user);
    navigate('/profile');
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