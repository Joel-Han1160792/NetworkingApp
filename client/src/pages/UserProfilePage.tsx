import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserProfilePage(){
    return(
         <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
                <Navbar />
        <main className= 'pt-16 w-full flex-1 flex flex-col items-center justify-center'>
           <p>This is Joel!</p> 
        </main>
        <Footer/>
        </div>
    );
}