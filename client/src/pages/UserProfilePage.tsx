import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
export default function UserProfilePage(){
    const { user } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
    return(
         <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
                <Navbar />
        <main className= "pt-16 w-full flex-1 flex flex-col items-center justify-center min-h-[800px]">
           <p>This is Joel!</p> 
     
        </main>
        <Footer/>
        </div>
    );
}