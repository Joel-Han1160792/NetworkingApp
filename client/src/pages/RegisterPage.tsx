import { RegisterForm } from "../components/RegisterForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import type { JwtPayload } from "../types/jwt";
import type { User } from "../types/user";
import mapJwtPayloadToUser from "../utils/mapJwtPayloadToUser";

export function RegisterPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleRegisterSuccess = (payload: JwtPayload) => {
    const user: User = mapJwtPayloadToUser(payload);
    setUser(user);
    navigate('/profile');
  };

  return (
    <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
      <Navbar />
      <main className="pt-16 w-full">
        <RegisterForm onRegister={handleRegisterSuccess} />
      </main>
      <Footer />
    </div>
  );
}
